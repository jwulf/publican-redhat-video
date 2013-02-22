%define brand redhat-video
%define wwwdir /var/www/html/docs

Name:		publican-redhat-video
Summary:	Common documentation files for %{brand}
Version:	0.42
Release:	1%{?dist}
License:	GPL v2
Group:		Applications/Text
Buildroot:	%{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)
Source:		https://svn.devel.redhat.com/repos/ecs/toolkit/publican-redhat-video/%{name}-%{version}.tgz
Requires:	publican >= 3.0
BuildRequires:	publican >= 3.0
URL:		https://svn.devel.redhat.com/repos/ecs/toolkit/publican-redhat-video
BuildArch:  	noarch

%description
This package provides common files and templates needed to build documentation
for %{brand} with publican.

%package web
Summary:	Web styles for %{brand}
Group:		Documentation
Requires:	publican >= 3.0

%description web
Web Site common files for the %{brand} brand.

%prep
%setup -q 

%build
publican build --formats=xml --langs=all --publish

%install
rm -rf $RPM_BUILD_ROOT
mkdir -p -m755 $RPM_BUILD_ROOT%{_datadir}/publican/Common_Content
publican install_brand --path=$RPM_BUILD_ROOT%{_datadir}/publican/Common_Content
mkdir -p -m755 $RPM_BUILD_ROOT%{wwwdir}/%{brand}
publican install_brand --web --path=$RPM_BUILD_ROOT%{wwwdir}/%{brand}

%clean
rm -rf $RPM_BUILD_ROOT

%files
%defattr(-,root,root,-)
%doc README
%doc COPYING
%{_datadir}/publican/Common_Content/%{brand}

%files web
%defattr(-,root,root,-)
%{wwwdir}/%{brand}

%changelog
* Mon Feb 26 2013 Joshua Wulf <jwulf@redhat.com> 0.42-1
- Cookies working on Google Chrome and Firefox

* Mon Feb 26 2013 Joshua Wulf <jwulf@redhat.com> 0.42 
- Cookie support for persistent default programming language

* Mon Feb 26 2013 Joshua Wulf <jwulf@redhat.com> 0.41
- Enhanced topic change log behavior
- Added default programming language selector at each code tab

* Wed Feb 20 2013 Joshua Wulf <jwulf@redhat.com> 0.40
- Added support for topic change logs

* Fri Feb 15 2013 Joshua Wulf <jwulf@redhat.com> 0.31-2
- Added master selector css

* Thu Feb 14 2013 Joshua Wulf <jwulf@redhat.com> 0.31
- Added codetab borders to menu.css

* Thu Feb 14 2013 Joshua Wulf <jwulf@redhat.com> 0.30
- Incorporated JavaScript for Publican 3.1

* Wed Nov 7 2012 Joshua Wulf <jwulf@redhat.com> 0.29-4
- Added whitespace: pre-wrap to the code class, to avoid overflow

* Tue Nov 6 2012 Joshua Wulf <jwulf@redhat.com> 0.29-3 
- Added fix for Report a Bug link moving to div below
- Added line-height override to deal with Publican 3 website css
- Fixed typo caused by comment

* Mon Nov 5 2012 Joshua Wulf <jwulf@redhat.com> 0.29
- Added menu.css for -web package. Web fonts imported from Google's CDN. 
- Ref: https://bugzilla.redhat.com/show_bug.cgi?id=839975

* Thu Aug 16 2012 Cheryn Tan <chetan@redhat.com> 0.28-1
- Fixes for Publican 3.0

* Mon Aug 13 2012 Joshua Wulf <jwulf@redhat.com> 0.28
- Updates for Publican 3.0

* Sun Aug 05 2012 Joshua Wulf <jwulf@redhat.com> 0.27
- Moved javascript to bottom of page as per http://developer.yahoo.com/performance/rules.html#js_bottom
- Removed all inline javascript from html
- Implemented master switcher (no css yet)
- Added skynetBookID div to footer for cookie matching

* Tue Jul 24 2012 Joshua Wulf <jwulf@redhat.com> 0.26
- Fix for BZ 839460 Create xrefstyles to match csprocessor output 
 
* Tue Jul 24 2012 Joshua Wulf <jwulf@redhat.com> 0.25
- Fix for BZ 842483: Interaction of codetabs and named anchors
- Added ExclusiveArch: for compatibility with brew

* Mon Jul 23 2012 Joshua Wulf <jwulf@redhat.com> 0.22
- Added features from development branch:
- Brand includes JavaScript (embedded jQuery)
- Google Web fonts for great aesthetic justice
- <variablelist role="codetabs"> creates code switcher in html output
- Supports embedded video in Firefox

* Fri Nov  4 2011  Joshua Wulf <jwulf@redhat.com> 0.1
- Created Brand

