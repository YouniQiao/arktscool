import clsx from "clsx";
import React from "react";
import styles from "./publish-with-lerna.module.css";

export default function PublishWithLerna(): JSX.Element {
  return (
    <section className="padding-vert--xl container">
      <div className={clsx("row row--no-gutters shadow--md", styles.item)}>
        <div className={clsx("col col--6", styles.item__inner)}>
          <div>
            <h1 className="margin-bottom--md">并发增强</h1>
            <p className="margin-bottom--md">
              针对TS/JS并发能力支持有限的问题，ArkTS对并发编程API和能力进行了增强，提供了TaskPool和Worker两种并发API供开发者选择。
              另外，ArkTS进一步提出了Sendable的概念来支持对象在并发实例间的引用传递，提升ArkTS对象在并发实例间的通信性能。
            </p>
            <a className="button button--secondary" href="/">
              了解更多
            </a>
          </div>
        </div>
        <div
          className="col col--6"
          aria-hidden="true"
          style={{
            backgroundImage: "url('/images/background/parcel.avif')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
          }}
        ></div>
      </div>
    </section>
  );
}
