# RobtixTask

#### divided into two parts (Backend , frontend ,mysql DB)

# mysql Db
####  I created two tables (customer and feedback)
#### customer contain (id, name,email)
#### feedack contain (id, feedback,cstId)

### BackEnd I used (Nodejs, Expressjs, mysql ,sequilize ORM)

#### for Customer => I created (add cst , get all cst)
#### for feedback => I created (get all feedack which related with chosen cst , add a new feedback related to the chosen or selected cst )

### frontend I used (Reactjs, MaterialUI)
#### there two pages (home , Search)

## home rendered two separate components 
#### 1- customer which allow user to add a new cst and get all cst 
#### 2- feed which allow user to add a new feedback to selected cst  and get all feedback related to chosen cst 

## Search 
#### allow user to search for a word in feedbacks related to cosen cst 
