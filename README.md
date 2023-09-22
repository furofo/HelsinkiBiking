# HelsinkiBiking

This app was made with Visual Studio 2022 Community Edition. It is a C# app that uses .NET Blazor app framework. The Database is a MySQL database and uses React on the front end. It is deployed on AWS server and available at https://helsinkibiking.tech/ on the web. 


To configure this project locally: 
First, clone this repository. Then right-click on the project name and click on manage nu-get packages. If under the installed section and you do not have DotNetENv, Moq, and MySqlData packages, go back to  the browse section and download them. You will also need to create a local database called testhelsinkidatabase. The SQL Dump file for the database can be found here on Google Drive: [https://drive.google.com/file/d/1l-204h4cWVJNGAE23WWJHwr9_sabnTfT/view?usp=sharing](url) , it was made by exporting the database from a local database made with XAMPP. Download and import this database. This can be done with program like MYSQL Workbench then connecting to testhelsinkidatabase and clicking server -> data import at the top. Once downloaded you should be able to it locally to make sure it works properly.


NOTE: If using XAMPP to import may need to modify php.ini files to allow for the file upload as is larger than the regular limit. You can ignore this if using another tool that doesn't have these limitations. You can do this by clicking config and php.ini on the row that has Apache on it. Once in the php.ini file use ctrl + f to find these sections and update their max values to around 500m and to allow more time for the upload to be completed as needed until the import succeeds.
 Modify php.ini (can be found in the php directory of your XAMPP installation):
post_max_size = 128M
upload_max_filesize = 128M
max_execution_time = 300
max_input_time = 300


Once connected to the database you can run the HelsiniBiking program.cs file locally and should work!
