# HelsinkiBiking

This app was made with Visual Studio 2022 Community Edition. It is a C# app that uses .NET Blazor app framework. The Database is a MySQL database and uses React on the front end. 


To configure this project: 
First clone this repository. Then right-click on the project name and click on manage nu-get packages. If under the installed section and you do not have DotNetENv, Moq, and MySqlData packages, go back to  the browse section and download them. You will also need a local database called testhelsinkidatabase with correct tables. The SQL file for the database can be found here on google drive: https://drive.google.com/file/d/1knqDgbrbk8bCVEJr0iDFvTDAT_GEs1JD/view?usp=sharing, it was made by exporting the database from a local database made with XAMPP. Download and import this database and connect to it locally to make sure it works first. 


NOTE: If using XAMPP to import may need to modify php.ini files to allow for the file upload as is larger than regular limit. You can do this by clicking config and php.ini on the row that has Apache on it. Once in the php.ini file use ctrl + f to find these section and update their max values to around 500m and to allow more time for the upload to be completed as needed until the import succeeds.
 Modify php.ini (can be found in the php directory of your XAMPP installation):
post_max_size = 128M
upload_max_filesize = 128M
max_execution_time = 300
max_input_time = 300


Once connected to the database you can run the HelsiniBiking program.cs file locally and should work!
