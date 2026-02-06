FROM node:20-alpine

ARG MY_UID
ARG MY_GID

RUN apk add chromium gettext shadow

RUN if [ "$MY_UID" != "0" ]; then \
        deluser node && \
        if ! getent group "$MY_GID" >/dev/null; then \
            groupadd -g "$MY_GID" customgroup; \
        else \
            groupmod -n customgroup $(getent group "$MY_GID" | cut -d: -f1); \
        fi && \
        useradd -l -u "$MY_UID" -g "$MY_GID" node && \
        chown -R "$MY_UID:$MY_GID" /home/node; \
    fi

WORKDIR /home/node/app

