FROM node:12.16.1-alpine

# build intial apk binary cache and install iperf3
RUN apk add --no-cache iperf3 \
    && adduser -S iperf

EXPOSE 5201/tcp 5201/udp
EXPOSE 3000/tcp
