import { memo } from "react"
import { Link } from "react-router-dom"

function MembershipSection() {
  return (
    <section className="cta-area cta-area-v1 pt-60">
      <div className="container-1450" id="reg">
        <div className="cta-wrapper dark-blue-bg">
          <div className="row mt-50 justify-content-center align-items-center">
            <div className="col-xl-6 col-lg-6 mb-50" id="reg">
              <div className="membership-poster-box">
                <img
                  src="/assets/images/Registration/Membership(3).jpeg"
                  alt="Membership Drive Poster"
                  className="membership-poster-img"
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6" id="register">
              <div className="text-wrapper wow fadeInUp ml-15">
                <div className="section-title section-title-white mb-5">
                  <h2>
                    <span className="sub-title">Membership Drive 2025</span>
                  </h2>
                  <span className="fill-text" />
                  <h2 align="left">
                    <span className="fill-text">Join Us in </span> being the Change{" "}
                    <span className="fill-text"> you want to see</span>
                    <br />
                    <br />
                    <span className="fill-text"> Join Us now </span>
                  </h2>
                </div>
                <Link
                  to="/registrations#register"
                  className="main-btn bordered-btn btn-white arrow-btn"
                >
                  Register!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(MembershipSection)
