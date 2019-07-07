FROM jordan/icinga2:latest

COPY hosts.conf /_inst_tmp/hosts.conf
COPY commands.conf /_inst_tmp/commands.conf

RUN ls -rtla /etc
RUN ls -rtla /etc/icinga2
#RUN ls -rtla /etc/icinga2/conf.d
#RUN cat /_inst_tmp/commands.conf >> /etc/icinga2/conf.d/commands.conf
#RUN cat /_inst_tmp/hosts.conf >> /etc/icinga2/conf.d/hosts.conf
#RUN rm -rf /_inst_tmp
