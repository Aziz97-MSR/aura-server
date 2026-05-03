
# ALL GET API Endpoints
| Endpoint | Description | Data Source |
| :--- | :--- | :--- |
| `/nav` | Retrieves navigation menu items | `navcollection` |
| `/hero` | Data for the homepage hero section | `herocollection` |
| `/intro` | Intro Message | `introcollection` |
| `/experience` | List of Experience | `Experiencecollection` |
| `/education` | List of Educations | `educationcollection` |
| `/skill` | List of Skills | `skillcollection` |
| `/about` | about section of data | `aboutcollection` |
| `/project` | Project showcasing data | `projectscollection` |
| `/award` | award showcasing data | `awardcollection` |
| `/cv` | To get CV related data | `cvcollection` |
| `/footer` | Footer links and contact info | `footercollection` |


# ALL Section-Update API
| Endpoint | Method | Description |

| /about/:id | PUT | Editing about section paragraph|
| /footer/:id | PUT | Editing footer section paragraph |
| /cv/:id | PUT | Editing CV LINK |


# ALL Section LIST EDITING API
| Endpoint | Method | Description |

| /experience/:id | PUT | ADD new item on experience list | 
| /skill/:id | PUT | ADD new item on skill list | 
| /scocial/:id | PUT | ADD new item on footer social links list | 
| /education/:id | PUT | ADD new item on education list | 
| /feature/:id | PUT | ADD new item on project list | 
| /award/:id | PUT | ADD new item on award list | 


# Delete from Section LIST api

| Endpoint | Method | Description |

| /delete/award/:id/:name | PUT | delete from award list|
| /delete/education/:id/:name | PUT | delete from education list|
| /delete/skill/:id/:name | PUT | delete from Skill list|
| /delete/feature/:id/:name | PUT | delete from project list|

# Edit in section LIST

| Endpoint | Method | Description |


| /education/:id/:name | PUT | EDIT a item on education list |
| /detailes/:id/:name | PUT | EDIT a item on footer detailes list |
| /award/:id/:name | PUT | EDIT a item on award list |
| /skill/:id/:name | PUT | EDIT a item on experience list |
| /feature/:id/:name| PUT | EDIT a item on project list |