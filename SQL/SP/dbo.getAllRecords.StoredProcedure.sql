USE [fileUploading]
GO
/****** Object:  StoredProcedure [dbo].[getAllRecords]    Script Date: 14-08-2020 16:43:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getAllRecords] AS
BEGIN
		SELECT * FROM dbo.files;
END;

GO
