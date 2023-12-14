from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
import networkx as nx
import random
import math


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
# def assign_projects( max_attempts=1000):
#     client = MongoClient('mongodb+srv://rakshith:12345@cpms.bmohl6t.mongodb.net/?retryWrites=true&w=majority')
#     preferences = client.test["preferences"]
#     users = client.test["users"]
#     projects = client.test["projects"]

#     preferences = preferences.find()
#     users = users.find()
#     projects = projects.find()
    
#     pref_list = [pref for pref in preferences]
#     user_list = [user for user in users]
#     project_list = [project for project in projects]

#     u_project_list = []
#     for project in project_list:
#         if project['name'] not in u_project_list:
#             u_project_list.append(project['name'])
            
#     capacities = dict()
#     final_pref_list = dict()
    
#     for preference in pref_list:
    
#         ordered_projectNames = list()
#         sorted_projectPreferences = sorted(preference['projectPreferences'], key=lambda x:x['rank'])
#         # print(sorted_projectPreferences)
#         for sorted_projectPreference in sorted_projectPreferences:
#             for project in project_list:
#                 # print(project)
#                 if sorted_projectPreference['project']==project['_id']:
#                     ordered_projectNames.append(project['name'])
#             # print(ordered_projectNames)
                    
#             for user in user_list:
#                 if preference['student'] == user['_id']:
#                     final_pref_list[user['name']]= ordered_projectNames
                    
#     for pref in final_pref_list:
#         selected_projects = list()
#         for proj in final_pref_list[pref]:
#             if proj not in selected_projects:
#                 selected_projects.append(str(proj))
#         final_pref_list[pref] = selected_projects
        
#     count = 0
#     for project in range(len(u_project_list)):
#         if count == (len(u_project_list)-1):
#             capacities[u_project_list[project]]=int(math.floor(len(final_pref_list)/len(u_project_list))) +1
#         else:
#             capacities[u_project_list[project]]=int(math.floor(len(final_pref_list)/len(u_project_list)))
#             count+=1
            
            
            
#     G = nx.DiGraph()
#     projects = list(capacities.keys())
    
    
        

#     for pref in final_pref_list:
#         while len(final_pref_list[pref]) < 4:
#             x = random.choice(projects)
#             if x not in final_pref_list[pref]:
#                 final_pref_list[pref].append(x)

#     num_persons = len(final_pref_list)
#     total_capacity = sum(capacities.values())

#     G.add_node('dest', demand=num_persons)

#     for person, projectlist in final_pref_list.items():
#         G.add_node(person, demand=-1)
#         for i, project in enumerate(projectlist):
#             if i == 0:
#                 cost = -100  # happy to assign first choice
#             elif i == 1:
#                 cost = -75  # slightly unhappy to assign second choice
#             elif i == 2:
#                 cost = -50  # ok to assign third choice
#             else:
#                 cost = -25  # very unhappy to assign fourth choice
#             G.add_edge(person, project, capacity=1, weight=cost)

#     for project, c in capacities.items():
#         G.add_edge(project, 'dest', capacity=c, weight=0)

#     result = {'assignments': []}
#     flowdict = nx.min_cost_flow(G)

#     for person in final_pref_list:
#         for project, flow in flowdict[person].items():
#             if flow:
#                 result['assignments'].append({'person': person, 'project': project})

#     return result

@app.route('/api/preferences')
def project_preferences():
    
    # max_attempts = 1000
    # current_attempt = 0

    # while current_attempt < max_attempts:
    #     result = assign_projects()
    #     if result['assignments']:
    #         print(result)
    #         return result
    #     current_attempt += 1
    # return {'error': 'No feasible flow found after {} attempts.'.format(max_attempts)}
    client = MongoClient('mongodb+srv://rakshith:12345@cpms.bmohl6t.mongodb.net/?retryWrites=true&w=majority')
    preferences = client.test["preferences"]
    users = client.test["users"]
    projects = client.test["projects"]

    preferences = preferences.find()
    users = users.find()
    projects = projects.find()
    
    pref_list = [pref for pref in preferences]
    user_list = [user for user in users]
    project_list = [project for project in projects]

    u_project_list = []
    for project in project_list:
        if project['name'] not in u_project_list:
            u_project_list.append(project['name'])
            
    capacities = dict()
    final_pref_list = dict()
    
    for preference in pref_list:
    
        ordered_projectNames = list()
        sorted_projectPreferences = sorted(preference['projectPreferences'], key=lambda x:x['rank'])
        # print(sorted_projectPreferences)
        for sorted_projectPreference in sorted_projectPreferences:
            for project in project_list:
                # print(project)
                if sorted_projectPreference['project']==project['_id']:
                    ordered_projectNames.append(project['name'])
            # print(ordered_projectNames)
                    
            for user in user_list:
                if preference['student'] == user['_id']:
                    final_pref_list[user['name']]= ordered_projectNames
                    
    for pref in final_pref_list:
        selected_projects = list()
        for proj in final_pref_list[pref]:
            if proj not in selected_projects:
                selected_projects.append(str(proj))
        final_pref_list[pref] = selected_projects
        
    count = 0
    for project in range(len(u_project_list)):
        if count == (len(u_project_list)-1):
            capacities[u_project_list[project]]=int(math.floor(len(final_pref_list)/len(u_project_list))) +1
        else:
            capacities[u_project_list[project]]=int(math.floor(len(final_pref_list)/len(u_project_list)))
            count+=1
            
            
            
    G = nx.DiGraph()
    projects = list(capacities.keys())
    
    
        

    for pref in final_pref_list:
        while len(final_pref_list[pref]) < 4:
            x = random.choice(projects)
            if x not in final_pref_list[pref]:
                final_pref_list[pref].append(x)

    num_persons = len(final_pref_list)
    total_capacity = sum(capacities.values())

    G.add_node('dest', demand=num_persons)

    for person, projectlist in final_pref_list.items():
        G.add_node(person, demand=-1)
        for i, project in enumerate(projectlist):
            if i == 0:
                cost = -100  # happy to assign first choice
            elif i == 1:
                cost = -75  # slightly unhappy to assign second choice
            elif i == 2:
                cost = -50  # ok to assign third choice
            else:
                cost = -25  # very unhappy to assign fourth choice
            G.add_edge(person, project, capacity=1, weight=cost)

    for project, c in capacities.items():
        G.add_edge(project, 'dest', capacity=c, weight=0)

    result = {'assignments': []}
    flowdict = nx.min_cost_flow(G)

    for person in final_pref_list:
        for project, flow in flowdict[person].items():
            if flow:
                result['assignments'].append({'person': person, 'project': project})

    return result
                
# print(project_preferences())
    