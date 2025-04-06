const { MongoClient, ServerApiVersion } = require("mongodb");

// Cadena de conexión al servicio MongoDB Atlas
const uri = "mongodb+srv://juanillo:MhoPgjYjjIOGLSbf@jar-pnet-2024-2025.sm7he.mongodb.net/?retryWrites=true&w=majority&appName=jar-pnet-2024-2025";

// Nombre de la base de datos
const dbName = "jar-pnet-2024-2025";

// Opciones de configuración del cliente MongoDB
const clientOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

// Crear un nuevo cliente MongoDB con las opciones especificadas (opcional)
const client = new MongoClient(uri, clientOptions);

let db;

// Método para conectarse a la base de datos
async function connectDb() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Conexión correcta a la base de datos");
    } catch (error) {
        console.error("Error conectando a la base de datos:", error);
        throw error;
    }
}

// Método para obtener acceso a una colección específica
function getCollection(collectionName) {
    if (!db) {
        throw new Error("No hay conexión a la base de datos");
    }
    return db.collection(collectionName);
}

module.exports = {
    connectDb,
    getCollection,
};