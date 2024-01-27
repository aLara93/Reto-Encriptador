// Función para generar la tabla inversa a partir de la tabla original
function generarTablaInversa(originalTable) {
    const inversaTable = {};
    for (const clave in originalTable) {
        if (originalTable.hasOwnProperty(clave)) {
            inversaTable[originalTable[clave]] = clave;
        }
    }
    return inversaTable;
}

// Tabla inversa generada automáticamente a partir de la tabla original
const leetTable = {
    'a': 'ai',
    'b': 'I3',
    'c': 'c',
    'd': 'd',
    'e': 'enter',
    'f': '|=',
    'g': '&',
    'h': '#',
    'i': 'imes',
    'j': ',_|',
    'k': '>|',
    'l': 'l',
    'm': 'm',
    'n': '^/',
    'o': 'ober',
    'p': '|*',
    'q': '(_,)',
    'r': 'I2',
    's': '5',
    't': '7',
    'u': 'ufat',
    'v': 'v',
    'w': '2u',
    'x': '><',
    'y': 'j',
    'z': '2',
    'L': '1',
    'R': '2',
    'E': '3',
    'A': '4',
    'S': '5',
    'b': '6',
    'T': '7',
    'B': '8',
    'g': '9',
    '0': '0'
};

// Variable para rastrear el estado actual (encriptar o desencriptar)
let isEncryptMode = false; // Inicializado en Desencriptar

// Función para cambiar entre Encriptar y Desencriptar
function toggleEncrypt() {
    const toggleButton = document.getElementById('toggleButton');
    const encryptButton = document.getElementById('encryptButton');

    if (isEncryptMode) {
        encryptButton.innerText = 'Desencriptar';
        encryptButton.onclick = convertToText;
        toggleButton.innerText = 'Cambiar a Encriptar';
    } else {
        encryptButton.innerText = 'Encriptar';
        encryptButton.onclick = convertToLeet;
        toggleButton.innerText = 'Cambiar a Desencriptar';
    }

    isEncryptMode = !isEncryptMode;
}

// Función para desencriptar el texto
function desencriptar(text) {
    // Tabla Leet inversa
    const leetTableInversa = {
        'ai': 'a',
        'I3': 'b',
        'c': 'c',
        'd': 'd',
        'enter': 'e',
        '|=': 'f',
        '&': 'g',
        '#': 'h',
        'imes': 'i',
        ',_|': 'j',
        '>|': 'k',
        'l': 'l',
        'm': 'm',
        '^/': 'n',
        'ober': 'o',
        '|*': 'p',
        '(_,)': 'q',
        'I2': 'r',
        '5': 's',
        '7': 't',
        'ufat': 'u',
        'v': 'v',
        '2u': 'w',
        '><': 'x',
        'j': 'y',
        '2': 'z',
        'L': '1',
        'R': '2',
        'E': '3',
        'A': '4',
        'S': '5',
        'b': '6',
        'T': '7',
        'B': '8',
        'g': '9',
        '0': '0'
    };

    let desencriptado = "";
    let i = 0;

    // Recorre el texto
    while (i < text.length) {
        // Toma dos caracteres
        let substring = text.substring(i, i + 2);

        // Verifica si la subcadena está en la tabla Leet inversa
        if (substring in leetTableInversa) {
            // Agrega el carácter desencriptado al resultado
            desencriptado += leetTableInversa[substring];
            i += 2; // Avanza dos posiciones en el texto
        } else {
            // Verifica palabras especiales
            let foundSpecialWord = false;
            for (const specialWord in leetTableInversa) {
                if (text.substring(i, i + specialWord.length) === specialWord) {
                    desencriptado += leetTableInversa[specialWord];
                    i += specialWord.length;
                    foundSpecialWord = true;
                    break;
                }
            }

            // Si no es una palabra especial, agrega el carácter original al resultado
            if (!foundSpecialWord) {
                desencriptado += text[i];
                i++; // Avanza una posición en el texto
            }
        }
    }

    return desencriptado;
}

// Función para convertir el texto a Leet Speak
function leetSpeak(text) {
    let leetText = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toLowerCase();
        if (char in leetTable) {
            leetText += leetTable[char];
        } else {
            leetText += text[i];
        }
    }
    return leetText;
}

// Función para copiar el contenido al portapapeles
function copiarContenido() {
    let texto = document.getElementById('result').innerText;
    navigator.clipboard.writeText(texto)
        .then(() => {
            console.log('Contenido copiado al portapapeles');
            // Borrar el texto dentro del input
            document.getElementById('inputText').value = '';
        })
        .catch((err) => {
            console.error('Error al copiar: ', err);
        });
}

// Función para convertir a Leet Speak y actualizar el resultado
function convertToLeet() {
    const textInput = document.getElementById('inputText').value;
    const leetText = leetSpeak(textInput);

    // Actualizar el contenido del cuadro de resultado
    document.getElementById('result').innerText = leetText;

    // Hacer visible el cuadro de resultado
    document.getElementById('resultBox').style.display = 'block';

    // Cambiar el texto y la función del botón
    const encryptButton = document.getElementById('encryptButton');
    encryptButton.innerText = 'Desencriptar';
    encryptButton.onclick = convertToText;
}

// Función para convertir de Leet Speak a texto y actualizar el resultado
function convertToText() {
    const leetText = document.getElementById('result').innerText;
    const text = desencriptar(leetText); // Aplica la función de desencriptar

    // Actualizar el contenido del cuadro de resultado
    document.getElementById('result').innerText = text;

    // Hacer visible el cuadro de resultado
    document.getElementById('resultBox').style.display = 'block';

    // Cambiar el texto y la función del botón
    const encryptButton = document.getElementById('encryptButton');
    encryptButton.innerText = 'Encriptar';
    encryptButton.onclick = convertToLeet;
}