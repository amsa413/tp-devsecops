# Image Java 21 pour executer Spring Boot
FROM eclipse-temurin:21-jre

# Dossier de travail
WORKDIR /app

# Copier le fichier JAR avec un proprietaire non privilegie
COPY --chown=10001:10001 target/democyber-0.0.1-SNAPSHOT.jar app.jar

# Executer l'application sans privileges root
USER 10001:10001

# Port utilise par Spring Boot
EXPOSE 8080

# Demarrer l'application CyberShield
ENTRYPOINT ["java", "-jar", "app.jar"]
