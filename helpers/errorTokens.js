export const errorTokens = (message) => {
    switch (message) {
        case "jwt malformed":
            return "Formato no válido";
        case "invalid token":
            return "Token inválido";
        case "jwt expired":
            return "Token expirado";
        case "invalid signature":
            return "Token no válido";
        default:
            return message;
    }
};