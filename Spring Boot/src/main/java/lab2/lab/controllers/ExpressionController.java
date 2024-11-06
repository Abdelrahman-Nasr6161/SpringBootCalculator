package lab2.lab.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lab2.lab.IEvaluator;
import lab2.lab.Models.ExpressionRequest;
import lombok.extern.java.Log;


@RestController
@RequestMapping("/api")
@Log
@CrossOrigin(origins = "*")
public class ExpressionController {
    
    @Autowired
    private IEvaluator evaluator;
    
    @PostMapping("/evaluate")
    public String evaluateExpression(@RequestBody ExpressionRequest request) {
      String result = evaluator.evaluate(request);
      return result;
    }
}

