from django.contrib.auth.models import Group

LIST_OF_GROUPS = ["CLIENT", "ADMIN"]

def build_group_list():
    for group in LIST_OF_GROUPS:
        new_group, created = Group.objects.get_or_create(name=group)
        if created:
            print(f"New group named {new_group} created successfully!")
        else:
            print(
                f"We couldn't create a group with name {group}. It seems {group} has already been declared as a group name.")
    return