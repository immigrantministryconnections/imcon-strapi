FROM mariadb:latest

COPY backup.sql docker-entrypoint-initdb.d/initdb.sql