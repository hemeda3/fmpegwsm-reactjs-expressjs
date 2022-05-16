var fs = require('fs');
var path = require('path');
const srcDirFFmpeg = __dirname+`/frontend/build`;
const srcDirPayment = __dirname+`/frontend-payment/build`;
const destDirFFmpeg = __dirname+`/backend/build-all/ffmpeg`;
const destDirPayment = __dirname+`/backend/build-all/payment`;

fs.rmSync(destDirFFmpeg, { recursive: true, force: true });
fs.rmSync(destDirPayment, { recursive: true, force: true });

fs.mkdirSync(destDirFFmpeg,{ recursive: true })
fs.mkdirSync(destDirPayment,{ recursive: true })

function copyFileSync( source, target ) {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
    var files = [];

    // Check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    // Copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}



copyFolderRecursiveSync(srcDirFFmpeg, destDirFFmpeg);
copyFolderRecursiveSync(srcDirPayment, destDirPayment);
