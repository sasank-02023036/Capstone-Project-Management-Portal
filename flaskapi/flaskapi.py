from flask import Flask
import project_preferences1

app = Flask(__name__)

@app.route('/flaskapi/preferences')
def project_allocation(flowdict):
    flowdict = project_preferences1.flowdict
    print(flowdict)
    for person in project_preferences1.prefs:
        for project,flow in flowdict[person].items():
            if flow:
                
                print (person,'joins',project)
