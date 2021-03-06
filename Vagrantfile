# -*- mode: ruby -*-
# vi: set ft=ruby ts=2 sw=2 expandtab :

PROJECT = "front_sentence_aligner"

ENV['VAGRANT_NO_PARALLEL'] = 'yes'
ENV['VAGRANT_DEFAULT_PROVIDER'] = 'docker'
Vagrant.configure(2) do |config|

  config.vm.define "db" do |db|
    db.vm.provider "docker" do |d|
      d.image = "postgres:9.5"
      d.name = "#{PROJECT}_db"
      d.env = {
        "POSTGRES_PASSWORD" => "vagrant",
        "POSTGRES_USER" => "vagrant",
        "POSTGRES_DB" => "vagrant",
      }
    end
  end

  config.vm.define "backend" do |db|
    db.vm.provider "docker" do |d|
      d.image = "allansimon/sentence-aligner"
      d.link "#{PROJECT}_db:db"
      d.name = "#{PROJECT}_backend"
      d.env = {
        "ROCKET_PORT" => "80",

        "DB_USER" => "vagrant",
        "DB_PASSWORD" => "vagrant",
        "DB_HOST" => "db",
        "DB_NAME" => "vagrant",
      }
    end
  end

  config.ssh.insert_key = false
  config.vm.define "dev", primary: true do |app|
    app.vm.provider "docker" do |d|
      d.image = "allansimon/docker-dev-js"

      d.name = "#{PROJECT}_dev"
      d.link "#{PROJECT}_db:db"
      d.link "#{PROJECT}_backend:backend"

      d.has_ssh = true
      d.env = {
        "HOST_USER_UID" => Process.euid,
      }
    end
    app.ssh.username = "vagrant"
  end
end
