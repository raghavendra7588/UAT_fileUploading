USE [fileUploading]
GO
/****** Object:  Table [dbo].[files]    Script Date: 14-08-2020 16:43:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[files](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[filePath] [varchar](200) NOT NULL,
	[fileType] [varchar](50) NOT NULL,
	[createdOn] [datetime] NULL,
	[userId] [varchar](50) NULL,
	[userRole] [varchar](255) NULL,
	[userName] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
