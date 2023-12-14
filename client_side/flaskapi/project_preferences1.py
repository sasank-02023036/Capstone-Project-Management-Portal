import networkx as nx

G=nx.DiGraph()

# prefs={'Atharva sachin khadgi':['Project4', 'Project10', 'Project2', 'Project7'],
# 'Vivek Kamisetty':['Project9', 'Project11', 'Project5', 'Project4'], #'Project8'
# 'Vishwajith Parushaboyena':['Project4', 'Project7', 'Project9', 'Project5'], #'Project11'
# 'Mukund Sai Ganesh Konkepudi':['Project11', 'Project4', 'Project9', 'Project10'],
# 'Sasank Varanasi':['Project4', 'Project10', 'Project11', 'Project7'],#'Project9', 'Project12']
# 'Karthik Mukka':['Project7', 'Project1', 'Project5', 'Project13'],
# 'Parth A':['Project7', 'Project5', 'Project10', 'Project4'],
# 'Qudseen Sultana':['Project4', 'Project10', 'Project7', 'Project1'],
# 'Abhishek Sharma':['Project11', 'Project1', 'Project7', 'Project13'],
# 'Sukruth Kotturu':['Project10', 'Project7', 'Project4', 'Project9'],
# 'Maulik Savalia':['Project7', 'Project10', 'Project6', 'Project4'],
# 'Navkar Uttamchand Jain':['Project1', 'Project3', 'Project11', 'Project7'],
# 'Vamshi Krishna Kuturu':['Project4', 'Project10', 'Project2', 'Project8'],
# 'Bharadwaj Nidumolu':['Project7', 'Project10', 'Project4', 'Project9'],
# 'Lucas Gustafson':['Project4', 'Project9', 'Project7', 'Project10'],
# 'Haridas Aravind':['Project9', 'Project4', 'Project7', 'Project11'],
# 'Venkata Pravallika Kirani Vutukuru':['Project7', 'Project10', 'Project5', 'Project4'],
# 'Yagna Hari Muni':['Project11', 'Project11', 'Project11', 'Project11'],
# 'Keerthana Aravapalli':['Project4', 'Project1', 'Project7', 'Project2'],
# 'Matt Glover':['Project11', 'Project2', 'Project6', 'Project1'],
# 'Thrishya chevvu':['Project1', 'Project7', 'Project4', 'Project2'],
# 'Priyansh Shah':['Project4', 'Project10', 'Project7', 'Project2'],
# 'Nishika Divya Lewis':['Project10', 'Project4', 'Project13', 'Project9'],
# 'Samhitha medi':['Project4', 'Project10', 'Project3', 'Project9'],
# 'Sneha':['Project4', 'Project7', 'Project11', 'Project12'],
# 'Mahsa Geshvadi':['Project7', 'Project10', 'Project5', 'Project?'],
# 'Nitish Pothukuchi':['Project7', 'Project13', 'Project5', 'Project1'],
# 'SahilK':['Project11', 'Project4', 'Project10', 'Project9'],
# 'Akhil Bommavaram':['Project3', 'Project2', 'Project8', 'Project10'],
# 'Dhairya Shah':['Project11', 'Project10', 'Project7', 'Project4'],
# 'Vidya Pedapothu':['Project7', 'Project10', 'Project4', 'Project9'],
# 'karan patel':['Project11', 'Project12', 'Project8', 'Project3'],
# 'Dhruv Shah':['Project11', 'Project12', 'Project5', 'Project7'],
# 'Somesh Balani':['Project11', 'Project12', 'Project4', 'Project13'],
# 'Sarthak Pansuria':['Project7', 'Project10', 'Project6', 'Project13']}

prefs = {'Rakshith': ['IT Cell - Social Media Tracker', 'U Access Inventory System'], 'Raxit': ['Fusion System', 'IT Cell - Social Media Tracker', 'My Project 2.0'], 'Sebastian Bennet': ['Fusion System', 'U Access Inventory System', 'IT Cell - Social Media Tracker'], 'Sienna Thomas': ['Capstone Project Management System', 'Drone Project'], 'Lydia Turner': ['Fusion System', 'U Access Inventory System', 'IT Cell - Social Media Tracker'], 'Sohail Mohanty': ['Drone Project', 'Fusion System'], 'Bhanupriya Banerjee': ['My Project 2.0', 'IT Cell - Social Media Tracker', 'Fusion System'], 'Pradeep Mahabir': ['Fusion System', 'Drone Project'], 'Jagat Aurora': ['IT Cell - Social Media Tracker', 'U Access Inventory System', 'Fusion System'], 'Jasmin Handa': ['Drone Project', 'IT Cell - Social Media Tracker', 'Capstone Project Management System'], 'Sara Nayak': ['U Access Inventory System', 'Fusion System'], 'Padama Kaur': ['My Project 2.0', 'Fusion System'], 'Yasmin Pillay': ['My Project 2.0', 'Drone Project'], 'Chameli Palan': ['Capstone Project Management System', 'Drone Project', 'Fusion System'], 'Nishita Kannan': ['Drone Project', 'My Project 2.0'], 'Logan Gagne': ['Drone Project', 'Fusion System', 'IT Cell - Social Media Tracker'], 'Madelyn Reid': ['U Access Inventory System', 'My Project 2.0'], 'Olivia Campbell': ['Fusion System', 'U Access Inventory System'], 'Logan Li': ['Fusion System', 'IT Cell - Social Media Tracker', 'Drone Project'], 'Mason Campbell': ['U Access Inventory System', 'IT Cell - Social Media Tracker', 'Capstone Project Management System'], 'Grayson Landry': ['U Access Inventory System', 'My Project 2.0'], 'Victoria Landry': ['Fusion System', 'Capstone Project Management System', 'IT Cell - Social Media Tracker'], 'Zoe Mitchell': ['Fusion System', 'Capstone Project Management System'], 'erqgwLIVer/libv': ['Project Name 2', 'Project Name 2', 'Project Name'], 'Nag is Asshole': ['Project Name 2', 'Project Name', 'Project Name 2'], 'Junichi Suzuki': ['Project Name 2', 'Project Name', 'Project Name 2'], 'Sukku Bhai': ['Project Name 2', 'Project Name 2', 'Project Name'], 'Akhil Bommavaram': ['Project Name 2', 'Project Name 2', 'Project Name'], 'Pawan The Kalyan': ['Project Name 2', 'Project Name', 'Project Name 2'], 'Bapi Raju': ['Project Name', 'Project Name 2', 'Project Name 2'], 'Vidhya': ['Project Name 2', 'Fusion System', 'My Project 2.0', 'Capstone Project Management System'], 'Vidhya Sree Narayanappa': ['MERN', 'My Project 2.0', 'Fusion System', 'Project Name 2']}

#capacities={'1':2,'2':10,'3':4}
# capacities={'Project1':3,'Project2':3,'Project3':3,'Project4':3,'Project5':3,'Project6':9,'Project7':3,'Project8':3,'Project9':3,'Project10':9,'Project11':3,'Project12':3,'Project13':3}

capacities = {'IT Cell - Social Media Tracker': 3, 'U Access Inventory System': 3, 'Fusion System': 3, 'My Project 2.0': 3, 'Capstone Project Management System': 3, 'Drone Project': 3, 'Project Name 2': 3, 'Project Name': 3, 'MERN': 8}

num_persons=len(prefs)
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
