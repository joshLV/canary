package com.canary.job;

import com.sunny.tool.LoggerTool;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * QuartzComponent
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-20
 */
@Component
public class ExampleJob {

    @Scheduled(cron = "0 */1 * * * ?")
    public void execute() {
        Date start = new Date();
        //do somethings

        Date end = new Date();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");
        LoggerTool.info("|EmailJob|execute|running|start| {}", dateFormat.format(start));
        LoggerTool.info("|EmailJob|execute|running|spend| {}", (end.getTime() - start.getTime()));
        LoggerTool.info("|EmailJob|execute|running| end | {}", dateFormat.format(end));
    }

}
