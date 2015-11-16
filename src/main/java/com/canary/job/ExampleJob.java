package com.canary.job;

import com.sunny.tool.LoggerTool;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

import java.text.SimpleDateFormat;

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
        StopWatch  stopWatch = new StopWatch();

        stopWatch.start();
        //do somethings
        stopWatch.stop();

        LoggerTool.info("|EmailJob|execute|running|spend| {}",stopWatch.getTotalTimeMillis());
    }

}
