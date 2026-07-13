import { CheckCircle2 } from "lucide-react";

export default function ServiceSection({ service }) {
  return (
    <section
  id={service.id}
  className={`service-row ${service.reverse ? "reverse" : ""}`}
>
      <div className="service-image">

        <img
          src={service.image}
          alt={service.highlight}
        />

      </div>

      <div className="service-content">

        <span className="service-number">
          {service.number}
        </span>

        {service.title && (
          <h5>{service.title}</h5>
        )}

        <h2>{service.highlight}</h2>

        <p>{service.description}</p>

        <ul>

          {service.points.map((item) => (
            <li key={item}>

              {item}
            </li>
          ))}

        </ul>

      </div>

    </section>
  );
}