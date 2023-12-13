from flask import Flask
from pymongo import MongoClient
import networkx as nx


app = Flask(__name__)
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

capacities = dict()



# print(capacities)

final_pref_list = dict()

# print(pref_list)
# print()
# print(user_list)
# print()
# print(project_list)

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
    

selected_projects = list()
 
for pref in final_pref_list:
    for proj in final_pref_list[pref]:
        if proj not in selected_projects:
            selected_projects.append(proj)

count = 0

for project in selected_projects:
    
    if count >= 8:
        capacities[project] = 8
        count += 1
    else:
        capacities[project] = 3
        count += 1
        
print(selected_projects)
print(len(selected_projects))
            
print(len(final_pref_list))
print(capacities)

# print()

# print(len(project_list))




prefs={'Atharva sachin khadgi':['Project4', 'Project10', 'Project2', 'Project7'],
'Vivek Kamisetty':['Project9', 'Project11', 'Project5', 'Project4'], #'Project8'
'Vishwajith Parushaboyena':['Project4', 'Project7', 'Project9', 'Project5'], #'Project11'
'Mukund Sai Ganesh Konkepudi':['Project11', 'Project4', 'Project9', 'Project10'],
'Sasank Varanasi':['Project4', 'Project10', 'Project11', 'Project7'],#'Project9', 'Project12']
'Karthik Mukka':['Project7', 'Project1', 'Project5', 'Project13'],
'Parth A':['Project7', 'Project5', 'Project10', 'Project4'],
'Qudseen Sultana':['Project4', 'Project10', 'Project7', 'Project1'],
'Abhishek Sharma':['Project11', 'Project1', 'Project7', 'Project13'],
'Sukruth Kotturu':['Project10', 'Project7', 'Project4', 'Project9'],
'Maulik Savalia':['Project7', 'Project10', 'Project6', 'Project4'],
'Navkar Uttamchand Jain':['Project1', 'Project3', 'Project11', 'Project7'],
'Vamshi Krishna Kuturu':['Project4', 'Project10', 'Project2', 'Project8'],
'Bharadwaj Nidumolu':['Project7', 'Project10', 'Project4', 'Project9'],
'Lucas Gustafson':['Project4', 'Project9', 'Project7', 'Project10'],
'Haridas Aravind':['Project9', 'Project4', 'Project7', 'Project11'],
'Venkata Pravallika Kirani Vutukuru':['Project7', 'Project10', 'Project5', 'Project4'],
'Yagna Hari Muni':['Project11', 'Project11', 'Project11', 'Project11'],
'Keerthana Aravapalli':['Project4', 'Project1', 'Project7', 'Project2'],
'Matt Glover':['Project11', 'Project2', 'Project6', 'Project1'],
'Thrishya chevvu':['Project1', 'Project7', 'Project4', 'Project2'],
'Priyansh Shah':['Project4', 'Project10', 'Project7', 'Project2'],
'Nishika Divya Lewis':['Project10', 'Project4', 'Project13', 'Project9'],
'Samhitha medi':['Project4', 'Project10', 'Project3', 'Project9'],
'Sneha':['Project4', 'Project7', 'Project11', 'Project12'],
'Mahsa Geshvadi':['Project7', 'Project10', 'Project5', 'Project?'],
'Nitish Pothukuchi':['Project7', 'Project13', 'Project5', 'Project1'],
'SahilK':['Project11', 'Project4', 'Project10', 'Project9'],
'Akhil Bommavaram':['Project3', 'Project2', 'Project8', 'Project10'],
'Dhairya Shah':['Project11', 'Project10', 'Project7', 'Project4'],
'Vidya Pedapothu':['Project7', 'Project10', 'Project4', 'Project9'],
'karan patel':['Project11', 'Project12', 'Project8', 'Project3'],
'Dhruv Shah':['Project11', 'Project12', 'Project5', 'Project7'],
'Somesh Balani':['Project11', 'Project12', 'Project4', 'Project13'],
'Sarthak Pansuria':['Project7', 'Project10', 'Project6', 'Project13']}

@app.route('/preferences')
def project_preferences(prefs, capacities):
    
    G=nx.DiGraph()
    
    # capacities={'Project1':3,'Project2':3,'Project3':3,'Project4':3,'Project5':3,'Project6':9,'Project7':3,'Project8':3,'Project9':3,'Project10':9,'Project11':3,'Project12':3,'Project13':3}

    for pref in prefs:
        if len(prefs[pref]) == 0:
            prefs[pref] = ['dummy1', 'dummy2', 'dummy3', 'dummy4']
        elif len(prefs[pref]) == 1:
            prefs[pref] = prefs[pref] + ['dummy1', 'dummy2', 'dummy3']
        elif len(prefs[pref]) == 2:
            prefs[pref] = prefs[pref] + ['dummy1', 'dummy2']
        elif len(prefs[pref]) == 3:
            prefs[pref] = prefs[pref] + ['dummy1']
    
    print(prefs)
    num_persons=len(prefs)
    print(num_persons)
    print(capacities)
    total_capacity = sum(capacities.values())
    print(total_capacity)
    
    if num_persons != total_capacity:
        raise ValueError("Total demand does not equal total supply.")
    
    G.add_node('dest',demand=num_persons)
    A=[]
    for person,projectlist in prefs.items():
        G.add_node(person,demand=-1)
        for i,project in enumerate(projectlist):
            if i==0:
                cost=-100 # happy to assign first choice
            elif i==1:
                cost=-75 # slightly unhappy to assign second choice
            elif i==2:
                cost=-50 # ok to assign third choice
            else:
                cost=-25 # very unhappy to assign fourth choice
            G.add_edge(person,project,capacity=1,weight=cost) # Edge taken if person does this project

    for project,c in capacities.items():
            G.add_edge(project,'dest',capacity=c,weight=0)

    flowdict = nx.min_cost_flow(G)
    for person in prefs:
        for project,flow in flowdict[person].items():
            if flow:
                print (person,'joins',project)
                
project_preferences(final_pref_list, capacities)
    