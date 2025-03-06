# ------------------------
# Application
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Optimize docker cache
COPY ["./backend.csproj", "backend/"] 
WORKDIR /src/backend
RUN dotnet restore

# Ignoring test project
COPY . .

# Compile project
RUN dotnet build -c $BUILD_CONFIGURATION -o /app/build

# Publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Run application
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "backend.dll"]


# ------------------------
# FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
# USER app
# WORKDIR /app
# EXPOSE 8080
# EXPOSE 8081

# FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
# ARG BUILD_CONFIGURATION=Release
# WORKDIR /src/backend 
# COPY ["./backend.csproj", "backend/"] 
# RUN dotnet restore "./backend.csproj" 
# COPY . .

# RUN dotnet build "./backend.csproj" -c $BUILD_CONFIGURATION -o /app/build

# FROM build AS publish
# ARG BUILD_CONFIGURATION=Release
# RUN dotnet publish "./backend.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "backend.dll"]

# ------------------------
# FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

# WORKDIR /app

# COPY backend.sln ./   

# COPY backend/*.csproj ./backend/  

# RUN dotnet restore backend/backend.csproj 

# COPY . .

# RUN dotnet publish backend/backend.csproj -c Release -o out 

# FROM mcr.microsoft.com/dotnet/aspnet:9.0

# WORKDIR /app

# COPY --from=build /app/out ./

# EXPOSE 80

# ENTRYPOINT ["dotnet", "backend.dll"]
