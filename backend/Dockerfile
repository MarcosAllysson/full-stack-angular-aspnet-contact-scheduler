FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /app

COPY backend.sln ./  

COPY backend/*.csproj ./backend/ 

# COPY *.csproj ./

RUN dotnet restore backend/backend.csproj 

# RUN dotnet restore

COPY . ./

#publica o projeto correto
RUN dotnet publish backend/backend.csproj -c Release -o out 

# RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:9.0

WORKDIR /app

COPY --from=build /app/out ./

ENTRYPOINT ["dotnet", "backend.dll"]
