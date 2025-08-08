#include <napi.h>
#include <windows.h>
#include <string>

// 定义函数指针类型
typedef int (WINAPI* CVR_InitComm)(int);
typedef int (WINAPI* CVR_CloseComm)();
typedef int (WINAPI* CVR_Authenticate)(int);
typedef int (WINAPI* CVR_Read_Content)(int);
typedef int (WINAPI* GetPeopleName)(char*, int*);
typedef int (WINAPI* GetPeopleSex)(char*, int*);
typedef int (WINAPI* GetPeopleIDCode)(char*, int*);

// 将原始代码中的char数组转换为UTF-8字符串
Napi::String GetNapiString(Napi::Env env, const char* buffer) {
    // 假设原始编码是GBK（中文Windows默认编码）
    std::string gbkStr(buffer);

    // GBK转UTF-8
    int len = MultiByteToWideChar(CP_ACP, 0, gbkStr.c_str(), -1, NULL, 0);
    wchar_t* wstr = new wchar_t[len];
    MultiByteToWideChar(CP_ACP, 0, gbkStr.c_str(), -1, wstr, len);

    len = WideCharToMultiByte(CP_UTF8, 0, wstr, -1, NULL, 0, NULL, NULL);
    char* utf8str = new char[len];
    WideCharToMultiByte(CP_UTF8, 0, wstr, -1, utf8str, len, NULL, NULL);

    Napi::String result = Napi::String::New(env, utf8str);
    delete[] wstr;
    delete[] utf8str;
    return result;
}

Napi::Object ReadIDCard(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    // 准备返回对象
    Napi::Object result = Napi::Object::New(env);
    
    // 初始化变量
    int code = 0;
    std::string message = "成功";
    char name[64] = { 0 };
    char sex[16] = { 0 };
    char idCode[64] = { 0 };

    HINSTANCE hDLL = LoadLibrary(TEXT("Termb.dll"));
    if (!hDLL) {
        message = "无法加载动态库 termb.dll";
        result.Set("code", -1);
        result.Set("message", GetNapiString(env, message.c_str()));
        return result;
    }

    // 获取函数指针
    CVR_InitComm initComm = (CVR_InitComm)GetProcAddress(hDLL, "CVR_InitComm");
    CVR_CloseComm closeComm = (CVR_CloseComm)GetProcAddress(hDLL, "CVR_CloseComm");
    CVR_Authenticate authenticate = (CVR_Authenticate)GetProcAddress(hDLL, "CVR_Authenticate");
    CVR_Read_Content readContent = (CVR_Read_Content)GetProcAddress(hDLL, "CVR_Read_Content");
    GetPeopleName getName = (GetPeopleName)GetProcAddress(hDLL, "GetPeopleName");
    GetPeopleSex getSex = (GetPeopleSex)GetProcAddress(hDLL, "GetPeopleSex");
    GetPeopleIDCode getIDCode = (GetPeopleIDCode)GetProcAddress(hDLL, "GetPeopleIDCode");

    if (!initComm || !closeComm || !authenticate || !readContent || !getName || !getSex || !getIDCode) {
        message = "无法获取函数指针";
        result.Set("code", -1);
        result.Set("message", GetNapiString(env, message.c_str()));
        FreeLibrary(hDLL);
        return result;
    }

    // 初始化连接 - 假设使用USB口1
    int port = 1001;
    int ret = initComm(port);
    if (ret != 1) {
        message = "初始化连接失败，错误码: " + std::to_string(ret);
        result.Set("code", -1);
        result.Set("message", GetNapiString(env, message.c_str()));
        FreeLibrary(hDLL);
        return result;
    }

    // 卡认证
    ret = authenticate(1);
    if (ret != 1) {
        message = "卡认证失败，错误码: " + std::to_string(ret);
        result.Set("code", -1);
        result.Set("message", GetNapiString(env, message.c_str()));
        closeComm();
        FreeLibrary(hDLL);
        return result;
    }

    // 读卡操作 - 参数1表示保存所有文件
    ret = readContent(1);
    if (ret != 1) {
        message = "读卡失败，错误码: " + std::to_string(ret);
        result.Set("code", -1);
        result.Set("message", GetNapiString(env, message.c_str()));
        closeComm();
        FreeLibrary(hDLL);
        return result;
    }

    // 获取基本信息
    int nameLen = sizeof(name);
    getName(name, &nameLen);

    int sexLen = sizeof(sex);
    getSex(sex, &sexLen);

    int idCodeLen = sizeof(idCode);
    getIDCode(idCode, &idCodeLen);

    // 关闭连接
    closeComm();
    FreeLibrary(hDLL);


    // 设置返回结果
    result.Set("code", 0);
    result.Set("name", GetNapiString(env, name));
    result.Set("sex", GetNapiString(env, sex));
    result.Set("message", GetNapiString(env, "成功")); // 硬编码确保UTF-8
    result.Set("idCode", Napi::String::New(env, idCode));

    return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "readIDCard"), 
              Napi::Function::New(env, ReadIDCard));
    return exports;
}

NODE_API_MODULE(id_reader, Init)