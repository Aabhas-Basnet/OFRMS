from __future__ import print_function
from datetime import date
import eel

eel.init('web')

Names = []
Sources = []
Sname = "C:/Users/aabhas/Desktop/Saved/"


def Load():
    f = open ('Files/Files.txt','r')
    Lines = f.readlines()
    
    for Line in Lines:
      Striped = Line.strip('\n')
      Splited = Striped.split(',')
      Names.append(Splited[0])
      Sources.append(Splited[1])

@eel.expose
def Add_record(des,am,ty,src,uid):
    f = open ("C:/Users/aabhas/Desktop/Saved/" +uid,'a')
    f1 = open ("C:/Users/aabhas/Desktop/Saved/" +uid,'r')
    Line = f1.readline()
    Time = date.today()
    f.write(str(Time)+','+des+','+am+','+src+','+str(ty)+'\n')
    f.close()
    f1.close()
    
@eel.expose
def Add_file (x,y):
    f1 = open ('Files/Files.txt','a')
    f1.write(x+','+Sname+y+','+'\n')
    f1.close()

    f = open (Sname+y,'a')
    f2 = open (Sname+y,'r')
    Line = f2.readline()
    
    if (Line ==""):
      f.write('Date ,' + 'Description ,' + 'Amount ,'  + 'Source ,' + 'Transaction Type ,'+ '\n')

    f.close()
    f2.close()
    

@eel.expose
def Del_file (x,y):
    f2 = open ('Files/Files.txt','r')
    lines = f2.readlines()
    f2.close()
    
    f3 = open ('Files/Files.txt','w')
    f3.truncate(0)
    
    for line in lines:
       if line.strip("\n") != x+','+Sname+y+',' : 
         f3.write(line)
    f3.close()

eel.Receive_Info(Names,Sources)
eel.start('AddInfo.html', size=(300,200)) 
