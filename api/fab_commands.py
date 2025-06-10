from fabric import task

from config.utils.role_based import build_group_list

@task
def buildgrouplist(ctx):
    build_group_list()