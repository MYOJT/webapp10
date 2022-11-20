@echo off
Rem 自作アプリ立ち上げ自動化バッチ
rem Bypass "Terminate Batch Job" Prompt.
if "%~1"=="-FIXED_CTRL_C" (
   REM Remove the -FIXED_CTRL_C parameter
   SHIFT
) ELSE (
   REM Run the batch with <NUL and -FIXED_CTRL_C
   CALL <NUL %0 -FIXED_CTRL_C %*
   GOTO :EOF
)
setlocal enabledelayedexpansion
cd %~dp0
rem bundle.jsのフォルダに移動

echo Push enterkey when you start app. ^If you finish ,push CTRL + C.
pause > null
node app.js
pause > null

