cmake_minimum_required(VERSION 3.15)
project(cardreader)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 指定Node.js
execute_process(
  COMMAND node -p "process.execPath.replace(/\\\\node.exe$/i, '') + '\\\\include\\\\node'"
  OUTPUT_VARIABLE NODE_INCLUDE_DIR
  OUTPUT_STRIP_TRAILING_WHITESPACE
)

include_directories("${NODE_INCLUDE_DIR}")

# 指定NPI
set(NODE_ADDON_API_DIR "${CMAKE_SOURCE_DIR}/node_modules/node-addon-api")
include_directories(
  "${NODE_ADDON_API_DIR}"
)
include_directories( ${NAPI_INCLUDE_PATH})

# 设置Windows特定的选项
if(WIN32)
    add_definitions(-D_WIN32_WINNT=0x0601)  # Windows 7或更高版本
endif()

# 添加Node.js扩展
add_library(${PROJECT_NAME} SHARED
    main.cpp
)

# Windows特定设置
if(WIN32)
    # 链接必要的Windows库
    target_link_libraries(${PROJECT_NAME} PRIVATE
       "C:/Users/86150/AppData/Local/node-gyp/Cache/18.12.0/x64/node.lib"
        kernel32.lib
        user32.lib
        advapi32.lib
    )
    
    # 复制Termb.dll
    add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different
            "${CMAKE_SOURCE_DIR}/Termb.dll"
            $<TARGET_FILE_DIR:${PROJECT_NAME}>
        COMMENT "Copying Termb.dll to output directory"
    )
    
    # 复制sdtapi.dll
    add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different
            "${CMAKE_SOURCE_DIR}/sdtapi.dll"
            $<TARGET_FILE_DIR:${PROJECT_NAME}>
        COMMENT "Copying sdtapi.dll to output directory"
    )
    
    # 复制WltRS.dll
    add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different
            "${CMAKE_SOURCE_DIR}/WltRS.dll"
            $<TARGET_FILE_DIR:${PROJECT_NAME}>
        COMMENT "Copying WltRS.dll to output directory"
    )
endif()

# 设置输出文件扩展名
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")