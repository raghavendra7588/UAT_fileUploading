USE [fileUploading]
GO
/****** Object:  StoredProcedure [dbo].[insertDocument]    Script Date: 14-08-2020 16:43:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[insertDocument](@filePath varchar(150),@fileType varchar(30),@userId varchar(50),@userRole varchar(255),@userName varchar(255)) AS
BEGIN
	INSERT INTO files (filePath, fileType,createdOn,userId,userRole,userName) VALUES(@filePath, @fileType,getDATE(),@userId,@userRole,@userName);
END 
GO
