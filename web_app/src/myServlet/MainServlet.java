package myServlet;
/**
 * Created by Daria Serebryakova on 28.02.2017.
 */

import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static java.lang.Math.pow;
import static java.lang.Math.sqrt;


public class MainServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin", "*");


        String AA = (String) req.getParameter("A");
        try {
            int A = Integer.parseInt(AA);

            String BB = (String) req.getParameter("B");
            int B = Integer.parseInt(BB);

            String CC = (String) req.getParameter("C");
            int C = Integer.parseInt(CC);

            double D = pow(B, 2) - 4 * A * C;
            double S = sqrt(D);
            double X = (-B + S) / (2 * A);
            double Y = (-B - S) / (2 * A);

            String responseToClient = "<data><X>" + X + "</X><Y>" + Y + "</Y></data>";


            resp.setStatus(HttpServletResponse.SC_OK);
            resp.setContentType("text/xml");
            resp.getWriter().write(responseToClient);
            resp.getWriter().flush();
        }
        catch (NumberFormatException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            e.printStackTrace();
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        super.doPost(req, resp);
    }

}
