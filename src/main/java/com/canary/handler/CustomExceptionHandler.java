package com.canary.handler;

import com.sunny.exception.CustomException;
import com.sunny.tool.HttpTool;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 统一异常处理
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-08-19
 */
@Component
public class CustomExceptionHandler implements HandlerExceptionResolver {

    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {

        if (ex instanceof CustomException) {
            CustomException customException = (CustomException) ex;
            HttpTool.writeResult(request, response, customException.getCode(), customException.getMessage(), null);
        } else {
            HttpTool.writeResult(request, response, -1, "system exception", null);
        }

        return null;
    }

}
