FROM node:14.15.5-slim as base
ENV NODE_ENV=production
EXPOSE 3000
EXPOSE 9229
LABEL maintainer="entropyhacker@gmail.com"
ADD https://github.com/krallin/tini/releases/download/v0.19.0/tini /tini
RUN chmod +x /tini
ADD https://github.com/amacneil/dbmate/releases/download/v1.8.0/dbmate-linux-amd64 /usr/local/bin/dbmate
RUN chmod +x /usr/local/bin/dbmate

# TODO: remove git
# RUN apt autoremove -y && apt-get clean
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json package-lock*.json ./
RUN npm completion >> ~/.bashrc && npm ci && npm cache clean --force
ENV PATH=/app/node_modules/.bin:$PATH

FROM base as dev
ENV NODE_ENV=development
# FIX change npm prefix to install as node
#USER root
#RUN npm i -g npm-check
#USER root
# git is required for git@github.com/ikatyang/parse-srcset.git
#RUN apt-get update && apt-get install -y git time
USER node
RUN npm install --only=development && mkdir .next && du -h --max-depth=1 .
CMD ["next", "dev"]

FROM dev as build
ENV NODE_ENV=production
COPY --chown=node:node . .
USER node
RUN npm run build

FROM build as test
RUN npm test
CMD ["npm", "test"]

FROM test as audit
RUN npm audit --audit-level critical

FROM base as prod
ENV NODE_ENV=production
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/healthcheck.js /app/

USER root
RUN du -h --max-depth=1 .
RUN rm -rf /app/.next/cache
USER node
HEALTHCHECK --interval=10s CMD node healthcheck.js
ENTRYPOINT ["/tini", "--"]
CMD ["next", "start"]
