# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, add_index :users, :email, unique: true|
|password|string|null: false|
|password confirmation|string|null: false|

### Association
- has_many :groups, through: :groups_users
- has_many :messages
- add_index :users, :name


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
|add_user|string|
|chat_menber|string|null: false|

### Association
- has_many :users, through: :groups_users
- has_many :messages
- add_index :groups, :group_name



## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|
|user_id|integer|

### Association
- belongs_to :group
- belongs_to :user