package qdproject.quickdiag.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
public class DiseaseService {

    public List<String> extractDiseaseNames(String scriptOutput) {
        Pattern pattern = Pattern.compile("\\d+\\. (.*)");
        Matcher matcher = pattern.matcher(scriptOutput);

        List<String> diseaseNames = new ArrayList<>();
        while (matcher.find()) {
            diseaseNames.add(matcher.group(1));
        }
        return diseaseNames;
    }

}
