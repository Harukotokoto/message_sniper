# Message Sniper

導入すると削除されたメッセージを閲覧することができます

**※データベースの軽量化のため、1,2週間に1度ログが削除されます。**

## スラッシュコマンド

1. 削除されたメッセージを見る
   - `/snipe delete`
2. 編集されたメッセージを見る
   - `/snipe edit`
3. 2つ以上前のメッセージを見る

   - `/snipe delete count:2`
   - `/snipe edit count:2`

4. 削除されたメッセージの保存の許可を切り替え
   - `/delete allow`
   - `/delete deny`
5. 編集されたメッセージの保存の許可を切り替え
   - `/edit allow`
   - `/edit deny`
6. 保存されたログを削除する
   - `/purge all`
   - `/purge delete`
   - `/purge edit`

## チャットコマンド

1. 削除されたメッセージを見る
   - `s#snipe delete`
   - `s#snipe`
2. 編集されたメッセージを見る
   - `s#snipe edit`
3. 2つ以上前のメッセージを見る

   - `s#snipe delete ?c 2`
   - `s#snipe edit ?c 2`

4. 削除されたメッセージの保存の許可を切り替え
   - `s#delete allow`
   - `s#delete deny`
5. 編集されたメッセージの保存の許可を切り替え
   - `s#edit allow`
   - `s#edit deny`
6. 保存されたログを削除する
   - `s#purge all`
   - `s#purge delete`
   - `s#purge edit`
