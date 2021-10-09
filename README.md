# Overview
- Django REST Framework と Next.js のプロジェクトです
- TwitterライクなSNSアプリを作成しています
- 機能はminimalに抑え、clone後にも拡張性のあるプロジェクトです

## Getting Started

### Django REST Framework (under sample-app/backend)
もしプロジェクト実行に必要なライブラリが足りなければ、エラーになります
Pipfileを参照してください
クイックスタートのために、プロジェクトのPipfileを使うことも可能です

開発サーバーを立てましょう

```:bash (sample-app/backend/)
python manage.py runserver
```

### Next.js (under sample-app/frontend)
もしプロジェクト実行に必要なライブラリが足りなければ、エラーになります
package.jsonを参照してください
クイックスタートのために、プロジェクトのpackage.jsonを使うことも可能です

開発サーバーを立てましょう

```:bash (sample-app/frontend/)
npm run dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開き、結果を確認できます
また、バックエンドAPIの挙動は [http://localhost:8000/api/v1](http://localhost:8000/api/v1) をルートパスにして、users, posts, connectionsのREST APIなどの結果をGUIで確認できます。

## Application Instruction
### Register and Login
[http://localhost:3000](http://localhost:3000) のトップページからユーザー登録・ログインができます
それぞれユーザーネームとパスワードの入力を行い、REGISTER/LOGINのボタンをクリックすることで実行できます
実行結果はDjango REST Frameworkで提供するAPIを通して、DjangoプロジェクトのDBに保存/問い合わせされ、適切に対処されます

### See posts of all users
ログイン後、はじめに表示される画面です
メニューバーに表示されたAllUserの文字をクリックすることでもこの画面を表示できます
DjangoのDBに登録されている投稿のすべてを表示します

### See posts of our follow users
メニューバーに表示されたFollowUserの文字をクリックすることでこの画面を表示できます
DjangoのDBに登録されている投稿のうち、ログインユーザーがフォロー（機能後述）するユーザーのものをすべて表示します

### See posts of us
メニューバーに表示された自分のユーザー名の文字をクリックすることでこの画面を表示できます
DjangoのDBに登録されている投稿のうち、ログインユーザーのものをすべて表示します

### Watch one post selected from above section viewing
上述した画面で表示される投稿のうち、いずれか1つの投稿UIの枠内をクリックすることで各投稿の詳細情報画面を表示できます
この画面では、投稿者に対して、フォローアクションを送信することができます
ログインユーザーがフォローしたユーザーの投稿に限り、上述したFollowUserの画面で抽出して確認することができます

### Make post
メニューバーに表示されたMekaPostの文字をクリックすることで、投稿用のモーダルを表示できます
表示されたフォームに投稿したいタイトル・内容を入力して、Submitを押すことでDjangoDBへの登録、Next.js画面への投稿追加の反映が行われます
モーダルはCancelボタンをクリックすることで閉じることができますが、一度閉じると直前までの編集内容は保存されずに削除されます

### Make follow action to a post user
各投稿の詳細表示画面でのみ行うことのできるアクションです。
ログインユーザーの投稿ではない場合、投稿UIの枠内に人形のアイコンが表示されています
このアイコンがフォロー/アンフォローアクションのトリガーになります
クリックするたび、投稿の所有者に対し、ログインユーザーからのフォロー状態が切り替わります
現在の状態は、このアイコンの色で識別できます
グレーの場合は未フォロー、ブルーの場合はフォローを表しています

### Make like action to a post
投稿用のモーダル表示中以外は、ログイン後ならすべての画面で行うことのできるアクションです。
投稿UIの枠内にハート形のアイコンが表示されています
このアイコンがライク/アンライクアクションのトリガーになります
クリックするたび、投稿に対し、ログインユーザーからのライク状態が切り替わります
現在の状態は、このアイコンの色で識別できます
グレーの場合は未ライク、ピンクの場合はライクを表しています
