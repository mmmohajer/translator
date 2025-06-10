FROM nginx:1.20.2-alpine

COPY ./configs/default.conf /etc/nginx/conf.d/default.conf
COPY ./configs/uwsgi_params /etc/nginx/uwsgi_params

RUN mkdir -p /vol/static && \
    chmod 755 /vol/static