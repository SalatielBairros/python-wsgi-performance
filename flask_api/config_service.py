from repository import Repository

def first_config_service(datas):
    name_list = ['first_first', 'first_second']

    return Repository().execute_action(datas, name_list)

def second_config_service(datas):
    name_list = ['second_first', 'second_second']

    return Repository().execute_action(datas, name_list)

def third_config_service(datas):
    name_list = ['third_first', 'third_second']

    return Repository().execute_action(datas, name_list)
