from database import db
from app.models import User

def create_database():
            db.create_all()
            print(" * Created Database")
            
def seed_database():
    users = [
        {
            "email" : "admin@gmail.com",
            "fname" : "Admin",
            "lname" : "User",
            "isAdmin" : True
        },{
             "email" : "user@gmail.com",
            "fname" : "Admin",
            "lname" : "User",
            "isAdmin" : False
        },
    ]
    
    for u in users:
        new_user = User(email=u["email"], fname=u["fname"], lname=u["lname"], isAdmin=u["isAdmin"])
        db.session.add(new_user)
        
    db.session.commit()
    print(" * Seeded Database")

