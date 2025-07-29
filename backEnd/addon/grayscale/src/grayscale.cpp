#include <napi.h>
#include <string>

// 使用 NAPI 命名空间中的类
using Napi::CallbackInfo;
using Napi::Env;
using Napi::Function;
using Napi::Object;
using Napi::String;
using Napi::TypeError;

// 接受字符串并返回相同字符串的函数
String EchoString(const CallbackInfo& info) {
  Env env = info.Env();

  // 参数验证
  if (info.Length() < 1 || !info[0].IsString()) {
    TypeError::New(env, "String expected").ThrowAsJavaScriptException();
    return String::New(env, "");
  }

  // 获取输入字符串
  std::string input = info[0].As<String>().Utf8Value();
  
  // 返回相同的字符串
  return String::New(env, input);
}

// 初始化函数
Object Init(Env env, Object exports) {
  exports.Set(
    String::New(env, "echo"),  // 导出函数名为 "echo"
    Function::New(env, EchoString)
  );
  return exports;
}

// 注册模块
NODE_API_MODULE(grayscale, Init)