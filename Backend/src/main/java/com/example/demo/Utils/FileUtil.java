package com.example.demo.Utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class FileUtil {

    public static String saveFile(byte[] data, String directory) throws IOException {
        // Ensure the directory exists
        Path dirPath = Paths.get(directory);
        if (!Files.exists(dirPath)) {
            Files.createDirectories(dirPath);
        }

        // Generate a unique file name
        String uniqueFileName = UUID.randomUUID().toString() + ".pdf"; // Change the extension as needed
        String filePath = directory + File.separator + uniqueFileName;

        try (FileOutputStream fos = new FileOutputStream(new File(filePath))) {
            fos.write(data);
        }

        return filePath;
    }
}

