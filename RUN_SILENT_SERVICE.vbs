Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
WshShell.CurrentDirectory = scriptDir

' Run backend silently with 0 window style (completely hidden in background)
WshShell.Run """" & scriptDir & "\.venv\Scripts\python.exe"" run.py --no-browser", 0, False
