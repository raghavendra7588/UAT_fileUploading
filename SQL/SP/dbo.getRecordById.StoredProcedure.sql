USE [fileUploading]
GO
/****** Object:  StoredProcedure [dbo].[getRecordById]    Script Date: 14-08-2020 16:43:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getRecordById](@userId varchar(50)) AS
BEGIN
		SELECT * FROM dbo.files where userId=@userId;
END
GO
