from flask import Blueprint, current_app, render_template
from flask import current_app as app
from flask_cors import cross_origin
from app.models import User, db

# Blueprint configuration
export = Blueprint(
    'export', __name__,
    url_prefix='/export'
)

@export.route('/events')
def export_events():
	try:
		# connect to testdata.db
		conn = sql.connect('testdata.db')
		cursor = conn.cursor()
		# select all values from users table
		cursor.execute("SELECT * FROM events")
		result = cursor.fetchall()
		output = io.StringIO()
		writer = csv.writer(output)
		field_names = [i[0] for i in cursor.description]
		writer.writerow(field_names)

		for row in result:
			writer.writerow(row)

		output.seek(0)
		
		return Response(output, mimetype="text/csv", headers={"Content-Disposition":"attachment;filename=event_report.csv"})
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

@export.route('/users')
def export_users():
	try:
		# connect to testdata.db
		conn = sql.connect('testdata.db')
		cursor = conn.cursor()
		# select all values from users table
		cursor.execute("SELECT * FROM users")
		result = cursor.fetchall()
		output = io.StringIO()
		writer = csv.writer(output)
		field_names = [i[0] for i in cursor.description]
		writer.writerow(field_names)

		for row in result:
			writer.writerow(row)

		output.seek(0)
		
		return Response(output, mimetype="text/csv", headers={"Content-Disposition":"attachment;filename=user_report.csv"})
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()
