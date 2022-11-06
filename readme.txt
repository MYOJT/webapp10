このアプリケーションを実行する手順

sample ディレクトリに移動し、
node app.js
を実行
Running at Port 8080...
が表示されたら、

https://localhost:8080/

に接続する

//
・pid取得
netstat -aon | find "8080"
・タスクkill
taskkill /pid <kill したい PID>

