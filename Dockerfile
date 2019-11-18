FROM 200.0.1.100:5000/node

WORKDIR /app

COPY . .

RUN npm install
EXPOSE 4000

CMD node index.js

