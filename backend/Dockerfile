# ------------------------
# Application
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
# EXPOSE 8081
# EXPOSE 5000

# Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Optimize docker cache
COPY ["./backend.csproj", "backend/"] 
WORKDIR /src/backend
RUN dotnet restore

# Ignoring test project; copying from folder to container
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
# COPY ./appsettings.json . 
# ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "backend.dll"]
