QUnit.module("ajax", {
	teardown: function () {
		jQuery(document).off("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxError ajaxSuccess");
		moduleTeardown.apply(this, arguments);
	}
});

(function () {


	function addGlobalEvents(expected, assert) {
		return function () {
			expected = expected || "";
			jQuery(document).on("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxError ajaxSuccess", function (e) {
				assert.ok(expected.indexOf(e.type) !== -1, e.type);
			});
		};
	}

	//----------- jQuery.ajax()

	testIframe(
		"XMLHttpRequest - Attempt to block tests because of dangling XHR requests (IE)",
		"ajax/unreleasedXHR.html",
		function (assert) {
			assert.expect(1);
			assert.ok(true, "done");
		}
	);

	ajaxTest("jQuery.ajax() - success callbacks", 8, function (assert) {
		return {
			setup: addGlobalEvents("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxSuccess", assert),
			url: url("data/name.html"),
			beforeSend: function () {
				assert.ok(true, "beforeSend");
			},
			success: function () {
				assert.ok(true, "success");
			},
			complete: function () {
				assert.ok(true, "complete");
			}
		};
	});

	ajaxTest("jQuery.ajax() - success callbacks - (url, options) syntax", 8, function (assert) {
		return {
			setup: addGlobalEvents("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxSuccess", assert),
			create: function (options) {
				return jQuery.ajax(url("data/name.html"), options);
			},
			beforeSend: function () {
				assert.ok(true, "beforeSend");
			},
			success: function () {
				assert.ok(true, "success");
			},
			complete: function () {
				assert.ok(true, "complete");
			}
		};
	});





	ajaxTest("jQuery.ajax() - success callbacks (late binding)", 8, function (assert) {
		return {
			setup: addGlobalEvents("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxSuccess", assert),
			url: url("data/name.html"),
			beforeSend: function () {
				assert.ok(true, "beforeSend");
			},
			success: true,
			afterSend: function (request) {
				request.always(function () {
					assert.ok(true, "complete");
				}).done(function () {
					assert.ok(true, "success");
				}).fail(function () {
					assert.ok(false, "error");
				});
			}
		};
	});

	ajaxTest("jQuery.ajax() - success callbacks (oncomplete binding)", 8, function (assert) {
		return {
			setup: addGlobalEvents("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxSuccess", assert),
			url: url("data/name.html"),
			beforeSend: function () {
				assert.ok(true, "beforeSend");
			},
			success: true,
			complete: function (xhr) {
				xhr.always(function () {
					assert.ok(true, "complete");
				}).done(function () {
					assert.ok(true, "success");
				}).fail(function () {
					assert.ok(false, "error");
				});
			}
		};
	});





	ajaxTest("jQuery.ajax() - protocol-less urls", 1, function (assert) {
		return {
			url: "//somedomain.com",
			beforeSend: function (xhr, settings) {
				assert.equal(settings.url, location.protocol + "//somedomain.com", "Make sure that the protocol is added.");
				return false;
			},
			error: true
		};
	});

	ajaxTest("jQuery.ajax() - hash", 4, function (assert) {
		return [{
			url: "data/name.html#foo",
			beforeSend: function (xhr, settings) {
				assert.equal(settings.url, "data/name.html#foo", "Make sure that the URL has its hash.");
				return false;
			},
			error: true
		}, {
			url: "data/name.html?abc#foo",
			beforeSend: function (xhr, settings) {
				assert.equal(settings.url, "data/name.html?abc#foo", "Make sure that the URL has its hash.");
				return false;
			},
			error: true
		}, {
			url: "data/name.html?abc#foo",
			data: {
				"test": 123
			},
			beforeSend: function (xhr, settings) {
				assert.equal(settings.url, "data/name.html?abc&test=123#foo", "Make sure that the URL has its hash.");
				return false;
			},
			error: true
		}, {
			url: "data/name.html?abc#brownies",
			data: {
				"devo": "hat"
			},
			cache: false,
			beforeSend: function (xhr, settings) {
				// Remove the random number, but ensure the cache-buster param is there
				var url = settings.url.replace(/\d+/, "");
				assert.equal(url, "data/name.html?abc&devo=hat&_=#brownies", "Make sure that the URL has its hash.");
				return false;
			},
			error: true
		}];
	});

	ajaxTest("jQuery.ajax() - traditional param encoding", 4, function (assert) {
		return [{
			url: "/",
			traditional: true,
			data: {
				"devo": "hat",
				"answer": 42,
				"quux": "a space"
			},
			beforeSend: function (xhr, settings) {
				assert.equal(settings.url, "/?devo=hat&answer=42&quux=a%20space", "Simple case");
				return false;
			},
			error: true
		}, {
			url: "/",
			traditional: true,
			data: {
				"a": [1, 2, 3],
				"b[]": ["b1", "b2"]
			},
			beforeSend: function (xhr, settings) {
				assert.equal(settings.url, "/?a=1&a=2&a=3&b%5B%5D=b1&b%5B%5D=b2", "Arrays");
				return false;
			},
			error: true
		}, {
			url: "/",
			traditional: true,
			data: {
				"a": [
					[1, 2],
					[3, 4], 5
				]
			},
			beforeSend: function (xhr, settings) {
				assert.equal(settings.url, "/?a=1%2C2&a=3%2C4&a=5", "Nested arrays");
				return false;
			},
			error: true
		}, {
			url: "/",
			traditional: true,
			data: {
				"a": ["w", [
					["x", "y"], "z"
				]]
			},
			cache: false,
			beforeSend: function (xhr, settings) {
				var url = settings.url.replace(/\d{3,}/, "");
				assert.equal(url, "/?a=w&a=x%2Cy%2Cz&_=", "Cache-buster");
				return false;
			},
			error: true
		}];
	});

	ajaxTest("jQuery.ajax() - cross-domain detection", 8, function (assert) {
		function request(url, title, crossDomainOrOptions) {
			return jQuery.extend({
				dataType: "jsonp",
				url: url,
				beforeSend: function (_, s) {
					assert.ok(crossDomainOrOptions === false ? !s.crossDomain : s.crossDomain, title);
					return false;
				},
				error: true
			}, crossDomainOrOptions);
		}

		var loc = document.location,
			samePort = loc.port || (loc.protocol === "http:" ? 80 : 443),
			otherPort = loc.port === 666 ? 667 : 666,
			otherProtocol = loc.protocol === "http:" ? "https:" : "http:";

		return [
			request(
				loc.protocol + "//" + loc.hostname + ":" + samePort,
				"Test matching ports are not detected as cross-domain",
				false
			),
			request(
				otherProtocol + "//" + loc.host,
				"Test different protocols are detected as cross-domain"
			),
			request(
				"app:/path",
				"Adobe AIR app:/ URL detected as cross-domain"
			),
			request(
				loc.protocol + "//example.invalid:" + (loc.port || 80),
				"Test different hostnames are detected as cross-domain"
			),
			request(
				loc.protocol + "//" + loc.hostname + ":" + otherPort,
				"Test different ports are detected as cross-domain"
			),
			request(
				"about:blank",
				"Test about:blank is detected as cross-domain"
			),
			request(
				loc.protocol + "//" + loc.host,
				"Test forced crossDomain is detected as cross-domain", {
					crossDomain: true
				}
			),
			request(
				" http://otherdomain.com",
				"Cross-domain url with leading space is detected as cross-domain"
			)
		];
	});




	ajaxTest("jQuery.ajax() - events with context", 12, function (assert) {
		var context = document.createElement("div");

		function event(e) {
			assert.equal(this, context, e.type);
		}

		function callback(msg) {
			return function () {
				assert.equal(this, context, "context is preserved on callback " + msg);
			};
		}

		return {
			setup: function () {
				jQuery(context).appendTo("#foo")
					.ajaxSend(event)
					.ajaxComplete(event)
					.ajaxError(event)
					.ajaxSuccess(event);
			},
			requests: [{
				url: url("data/name.html"),
				context: context,
				beforeSend: callback("beforeSend"),
				success: callback("success"),
				complete: callback("complete")
			}, {
				url: url("data/404.html"),
				context: context,
				beforeSend: callback("beforeSend"),
				error: callback("error"),
				complete: callback("complete")
			}]
		};
	});

	ajaxTest("jQuery.ajax() - events without context", 3, function (assert) {
		function nocallback(msg) {
			return function () {
				assert.equal(typeof this.url, "string", "context is settings on callback " + msg);
			};
		}
		return {
			url: url("data/404.html"),
			beforeSend: nocallback("beforeSend"),
			error: nocallback("error"),
			complete: nocallback("complete")
		};
	});


	ajaxTest("#15160 - jQuery.ajax() - request manually aborted in ajaxSend", 3, function (assert) {
		return {
			setup: function () {
				jQuery(document).on("ajaxSend", function (e, jqXHR) {
					jqXHR.abort();
				});

				jQuery(document).on("ajaxError ajaxComplete", function (e, jqXHR) {
					assert.equal(jqXHR.statusText, "abort", "jqXHR.statusText equals abort on global ajaxComplete and ajaxError events");
				});
			},
			url: url("data/name.html"),
			error: true,
			complete: function () {
				assert.ok(true, "complete");
			}
		};
	});

	ajaxTest("jQuery.ajax() - context modification", 1, function (assert) {
		return {
			url: url("data/name.html"),
			context: {},
			beforeSend: function () {
				this.test = "foo";
			},
			afterSend: function () {
				assert.strictEqual(this.context.test, "foo", "Make sure the original object is maintained.");
			},
			success: true
		};
	});

	ajaxTest("jQuery.ajax() - context modification through ajaxSetup", 3, function (assert) {
		var obj = {};
		return {
			setup: function () {
				jQuery.ajaxSetup({
					context: obj
				});
				assert.strictEqual(jQuery.ajaxSettings.context, obj, "Make sure the context is properly set in ajaxSettings.");
			},
			requests: [{
				url: url("data/name.html"),
				success: function () {
					assert.strictEqual(this, obj, "Make sure the original object is maintained.");
				}
			}, {
				url: url("data/name.html"),
				context: {},
				success: function () {
					assert.ok(this !== obj, "Make sure overriding context is possible.");
				}
			}]
		};
	});

	ajaxTest("jQuery.ajax() - disabled globals", 3, function (assert) {
		return {
			setup: addGlobalEvents("", assert),
			global: false,
			url: url("data/name.html"),
			beforeSend: function () {
				assert.ok(true, "beforeSend");
			},
			success: function () {
				assert.ok(true, "success");
			},
			complete: function () {
				assert.ok(true, "complete");
			}
		};
	});

	ajaxTest("jQuery.ajax() - xml: non-namespace elements inside namespaced elements", 3, function (assert) {
		return {
			url: url("data/with_fries.xml"),
			dataType: "xml",
			success: function (resp) {
				assert.equal(jQuery("properties", resp).length, 1, "properties in responseXML");
				assert.equal(jQuery("jsconf", resp).length, 1, "jsconf in responseXML");
				assert.equal(jQuery("thing", resp).length, 2, "things in responseXML");
			}
		};
	});



	ajaxTest("jQuery.ajax() - HEAD requests", 2, function (assert) {
		return [{
			url: url("data/name.html"),
			type: "HEAD",
			success: function (data, status, xhr) {
				assert.ok(/Date/i.test(xhr.getAllResponseHeaders()), "No Date in HEAD response");
			}
		}, {
			url: url("data/name.html"),
			data: {
				"whip_it": "good"
			},
			type: "HEAD",
			success: function (data, status, xhr) {
				assert.ok(/Date/i.test(xhr.getAllResponseHeaders()), "No Date in HEAD response with data");
			}
		}];
	});

	ajaxTest("jQuery.ajax() - beforeSend", 1, function (assert) {
		return {
			url: url("data/name.html"),
			beforeSend: function () {
				this.check = true;
			},
			success: function () {
				assert.ok(this.check, "check beforeSend was executed");
			}
		};
	});

	ajaxTest("jQuery.ajax() - beforeSend, cancel request manually", 2, function (assert) {
		return {
			create: function () {
				return jQuery.ajax({
					url: url("data/name.html"),
					beforeSend: function (xhr) {
						assert.ok(true, "beforeSend got called, canceling");
						xhr.abort();
					},
					success: function () {
						assert.ok(false, "request didn't get canceled");
					},
					complete: function () {
						assert.ok(false, "request didn't get canceled");
					},
					error: function () {
						assert.ok(false, "request didn't get canceled");
					}
				});
			},
			fail: function (_, reason) {
				assert.strictEqual(reason, "canceled", "canceled request must fail with 'canceled' status text");
			}
		};
	});

	ajaxTest("jQuery.ajax() - dataType html", 5, function (assert) {
		return {
			setup: function () {
				Globals.register("testFoo");
				Globals.register("testBar");
			},
			dataType: "html",
			url: url("data/test.html"),
			success: function (data) {
				assert.ok(data.match(/^html text/), "Check content for datatype html");
				jQuery("#ap").html(data);
				assert.strictEqual(window["testFoo"], "foo", "Check if script was evaluated for datatype html");
				assert.strictEqual(window["testBar"], "bar", "Check if script src was evaluated for datatype html");
			}
		};
	});

	ajaxTest("jQuery.ajax() - synchronous request", 1, function (assert) {
		return {
			url: url("data/json_obj.js"),
			dataType: "text",
			async: false,
			success: true,
			afterSend: function (xhr) {
				assert.ok(/^\{ "data"/.test(xhr.responseText), "check returned text");
			}
		};
	});

	ajaxTest("jQuery.ajax() - synchronous request with callbacks", 2, function (assert) {
		return {
			url: url("data/json_obj.js"),
			async: false,
			dataType: "text",
			success: true,
			afterSend: function (xhr) {
				var result;
				xhr.done(function (data) {
					assert.ok(true, "success callback executed");
					result = data;
				});
				assert.ok(/^\{ "data"/.test(result), "check returned text");
			}
		};
	});


	ajaxTest("jQuery.ajax() - malformed JSON", 2, function (assert) {
		return {
			url: "data/badjson.js",
			dataType: "json",
			error: function (xhr, msg, detailedMsg) {
				assert.strictEqual(msg, "parsererror", "A parse error occurred.");
				assert.ok(/(invalid|error|exception)/i.test(detailedMsg), "Detailed parsererror message provided");
			}
		};
	});
	ajaxTest("jQuery.ajax() - data - x-www-form-urlencoded (gh-2658)", 1, function (assert) {
		return {
			url: "bogus.html",
			data: {
				devo: "A Beautiful World"
			},
			type: "post",
			beforeSend: function (_, s) {
				assert.strictEqual(s.data, "devo=A+Beautiful+World", "data is '+'-encoded");
				return false;
			},
			error: true
		};
	});

	ajaxTest("jQuery.ajax() - data - text/plain (gh-2658)", 1, function (assert) {
		return {
			url: "bogus.html",
			data: {
				devo: "A Beautiful World"
			},
			type: "post",
			contentType: "text/plain",
			beforeSend: function (_, s) {
				assert.strictEqual(s.data, "devo=A%20Beautiful%20World", "data is %20-encoded");
				return false;
			},
			error: true
		};
	});

	ajaxTest("jQuery.ajax() - data - no processing ", 1, function (assert) {
		return {
			url: "bogus.html",
			data: {
				devo: "A Beautiful World"
			},
			type: "post",
			contentType: "x-special-sauce",
			processData: false,
			beforeSend: function (_, s) {
				assert.deepEqual(s.data, {
					devo: "A Beautiful World"
				}, "data is not processed");
				return false;
			},
			error: true
		};
	});

	var ifModifiedNow = new Date();



	ajaxTest("jQuery.ajax() - failing cross-domain (non-existing)", 1, function (assert) {
		return {

			// see RFC 2606
			url: "http://example.invalid",
			error: function (xhr, _, e) {
				assert.ok(true, "file not found: " + xhr.status + " => " + e);
			}
		};
	});

	ajaxTest("jQuery.ajax() - failing cross-domain", 1, function (assert) {
		return {
			url: "http://" + externalHost,
			error: function (xhr, _, e) {
				assert.ok(true, "access denied: " + xhr.status + " => " + e);
			}
		};
	});



	QUnit.asyncTest("jQuery.ajax() - statusCode", 20, function (assert) {

		var count = 12;

		function countComplete() {
			if (!--count) {
				QUnit.start();
			}
		}

		function createStatusCodes(name, isSuccess) {
			name = "Test " + name + " " + (isSuccess ? "success" : "error");
			return {
				200: function () {
					assert.ok(isSuccess, name);
				},
				404: function () {
					assert.ok(!isSuccess, name);
				}
			};
		}

		jQuery.each(
			/* jQuery.each arguments start */
			{
				"data/name.html": true,
				"data/someFileThatDoesNotExist.html": false
			},
			function (uri, isSuccess) {

				jQuery.ajax(url(uri), {
					statusCode: createStatusCodes("in options", isSuccess),
					complete: countComplete
				});

				jQuery.ajax(url(uri), {
					complete: countComplete
				}).statusCode(createStatusCodes("immediately with method", isSuccess));

				jQuery.ajax(url(uri), {
					complete: function (jqXHR) {
						jqXHR.statusCode(createStatusCodes("on complete", isSuccess));
						countComplete();
					}
				});

				jQuery.ajax(url(uri), {
					complete: function (jqXHR) {
						setTimeout(function () {
							jqXHR.statusCode(createStatusCodes("very late binding", isSuccess));
							countComplete();
						}, 100);
					}
				});

				jQuery.ajax(url(uri), {
					statusCode: createStatusCodes("all (options)", isSuccess),
					complete: function (jqXHR) {
						jqXHR.statusCode(createStatusCodes("all (on complete)", isSuccess));
						setTimeout(function () {
							jqXHR.statusCode(createStatusCodes("all (very late binding)", isSuccess));
							countComplete();
						}, 100);
					}
				}).statusCode(createStatusCodes("all (immediately with method)", isSuccess));

				var testString = "";

				jQuery.ajax(url(uri), {
					success: function (a, b, jqXHR) {
						assert.ok(isSuccess, "success");
						var statusCode = {};
						statusCode[jqXHR.status] = function () {
							testString += "B";
						};
						jqXHR.statusCode(statusCode);
						testString += "A";
					},
					error: function (jqXHR) {
						assert.ok(!isSuccess, "error");
						var statusCode = {};
						statusCode[jqXHR.status] = function () {
							testString += "B";
						};
						jqXHR.statusCode(statusCode);
						testString += "A";
					},
					complete: function () {
						assert.strictEqual(
							testString,
							"AB",
							"Test statusCode callbacks are ordered like " + (isSuccess ? "success" : "error") + " callbacks"
						);
						countComplete();
					}
				});

			}
			/* jQuery.each arguments end*/
		);
	});



	ajaxTest("#2688 - jQuery.ajax() - beforeSend, cancel request", 2, function (assert) {
		return {
			create: function () {
				return jQuery.ajax({
					url: url("data/name.html"),
					beforeSend: function () {
						assert.ok(true, "beforeSend got called, canceling");
						return false;
					},
					success: function () {
						assert.ok(false, "request didn't get canceled");
					},
					complete: function () {
						assert.ok(false, "request didn't get canceled");
					},
					error: function () {
						assert.ok(false, "request didn't get canceled");
					}
				});
			},
			fail: function (_, reason) {
				assert.strictEqual(reason, "canceled", "canceled request must fail with 'canceled' status text");
			}
		};
	});


	QUnit.test("#7531 - jQuery.ajax() - Location object as url", function (assert) {
		assert.expect(1);

		var xhr,
			success = false;
		try {
			xhr = jQuery.ajax({
				url: window.location
			});
			success = true;
			xhr.abort();
		} catch (e) {

		}
		assert.ok(success, "document.location did not generate exception");
	});


	ajaxTest("#8107 - jQuery.ajax() - multiple method signatures introduced in 1.5", 4, function (assert) {
		return [{
			create: function () {
				return jQuery.ajax();
			},
			done: function () {
				assert.ok(true, "With no arguments");
			}
		}, {
			create: function () {
				return jQuery.ajax("data/name.html");
			},
			done: function () {
				assert.ok(true, "With only string URL argument");
			}
		}, {
			create: function () {
				return jQuery.ajax("data/name.html", {});
			},
			done: function () {
				assert.ok(true, "With string URL param and map");
			}
		}, {
			create: function (options) {
				return jQuery.ajax(options);
			},
			url: "data/name.html",
			success: function () {
				assert.ok(true, "With only map");
			}
		}];
	});


	QUnit.test("#9887 - jQuery.ajax() - Context with circular references (#9887)", function (assert) {
		assert.expect(2);

		var success = false,
			context = {};
		context.field = context;
		try {
			jQuery.ajax("non-existing", {
				context: context,
				beforeSend: function () {
					assert.ok(this === context, "context was not deep extended");
					return false;
				}
			});
			success = true;
		} catch (e) {
			console.log(e);
		}
		assert.ok(success, "context with circular reference did not generate an exception");
	});

	jQuery.each(["as argument", "in settings object"], function (inSetting, title) {

		function request(assert, url, test) {
			return {
				create: function () {
					return jQuery.ajax(inSetting ? {
						url: url
					} : url);
				},
				done: function () {
					assert.ok(true, (test || url) + " " + title);
				}
			};
		}

		ajaxTest("#10093 - jQuery.ajax() - falsy url " + title, 4, function (assert) {
			return [
				request(assert, "", "empty string"),
				request(assert, false),
				request(assert, null),
				request(assert, undefined)
			];
		});
	});


	ajaxTest("#11426 - jQuery.ajax() - loading binary data shouldn't throw an exception in IE", 1, function (assert) {
		return {
			url: url("data/1x1.jpg"),
			success: function (data) {
				assert.ok(data === undefined || /JFIF/.test(data), "success callback reached");
			}
		};
	});

	if (typeof window.ArrayBuffer === "undefined" || typeof new XMLHttpRequest().responseType !== "string") {

		QUnit.skip("No ArrayBuffer support in XHR", jQuery.noop);
	} else {

		// No built-in support for binary data, but it's easy to add via a prefilter
		jQuery.ajaxPrefilter("arraybuffer", function (s) {
			s.xhrFields = {
				responseType: "arraybuffer"
			};
			s.responseFields.arraybuffer = "response";
			s.converters["binary arraybuffer"] = true;
		});

		ajaxTest("gh-2498 - jQuery.ajax() - binary data shouldn't throw an exception", 2, function (assert) {
			return {
				url: url("data/1x1.jpg"),
				dataType: "arraybuffer",
				success: function (data, s, jqxhr) {
					assert.ok(data instanceof window.ArrayBuffer, "correct data type");
					assert.ok(jqxhr.response instanceof window.ArrayBuffer, "data in jQXHR");
				}
			};
		});
	}

	QUnit.asyncTest("#11743 - jQuery.ajax() - script, throws exception", 1, function (assert) {
		var onerror = window.onerror;
		window.onerror = function () {
			assert.ok(true, "Exception thrown");
			window.onerror = onerror;
			QUnit.start();
		};
		jQuery.ajax({
			url: "data/badjson.js",
			dataType: "script",
			throws: true
		});
	});


	ajaxTest("#13276 - jQuery.ajax() - compatibility between XML documents from ajax requests and parsed string", 1, function (assert) {
		return {
			url: "data/dashboard.xml",
			dataType: "xml",
			success: function (ajaxXML) {
				var parsedXML = jQuery(jQuery.parseXML("<tab title=\"Added\">blibli</tab>")).find("tab");
				ajaxXML = jQuery(ajaxXML);
				try {
					ajaxXML.find("infowindowtab").append(parsedXML);
				} catch (e) {
					assert.strictEqual(e, undefined, "error");
					return;
				}
				assert.strictEqual(ajaxXML.find("tab").length, 3, "Parsed node was added properly");
			}
		};
	});

	ajaxTest("#13388 - jQuery.ajax() - responseXML", 3, function (assert) {
		return {
			url: url("data/with_fries.xml"),
			dataType: "xml",
			success: function (resp, _, jqXHR) {
				assert.notStrictEqual(resp, undefined, "XML document exists");
				assert.ok("responseXML" in jqXHR, "jqXHR.responseXML exists");
				assert.strictEqual(resp, jqXHR.responseXML, "jqXHR.responseXML is set correctly");
			}
		};
	});


	testIframe(
		"#14379 - jQuery.ajax() on unload",
		"ajax/onunload.html",
		function (assert, jQuery, window, document, status) {
			assert.expect(1);
			assert.strictEqual(status, "success", "Request completed");
		}
	);



	//----------- jQuery.ajaxPrefilter()

	ajaxTest("jQuery.ajaxPrefilter() - abort", 1, function (assert) {
		return {
			dataType: "prefix",
			setup: function () {

				// Ensure prefix does not throw an error
				jQuery.ajaxPrefilter("+prefix", function (options, _, jqXHR) {
					if (options.abortInPrefilter) {
						jqXHR.abort();
					}
				});
			},
			abortInPrefilter: true,
			error: function () {
				assert.ok(false, "error callback called");
			},
			fail: function (_, reason) {
				assert.strictEqual(reason, "canceled", "Request aborted by the prefilter must fail with 'canceled' status text");
			}
		};
	});

	//----------- jQuery.ajaxSetup()




	//----------- jQuery.domManip()



	QUnit.test(
		"#11402 - jQuery.domManip() - script in comments are properly evaluated", 2,
		function (assert) {
			jQuery("#qunit-fixture").load("data/cleanScript.html", assert.async());
		}
	);

	//----------- jQuery.get()

	QUnit.asyncTest("jQuery.get( String, Hash, Function ) - parse xml and use text() on nodes", 2, function (assert) {
		jQuery.get(url("data/dashboard.xml"), function (xml) {
			var content = [];
			jQuery("tab", xml).each(function () {
				content.push(jQuery(this).text());
			});
			assert.strictEqual(content[0], "blabla", "Check first tab");
			assert.strictEqual(content[1], "blublu", "Check second tab");
			QUnit.start();
		});
	});





	// //----------- jQuery.fn.load()

	// check if load can be called with only url
	QUnit.test("jQuery.fn.load( String )", 2, function (assert) {
		jQuery.ajaxSetup({
			beforeSend: function () {
				assert.strictEqual(this.type, "GET", "no data means GET request");
			}
		});
		jQuery("#first").load("data/name.html", assert.async());
	});

	QUnit.test("jQuery.fn.load() - 404 error callbacks", function (assert) {
		assert.expect(6);
		var done = assert.async();

		addGlobalEvents("ajaxStart ajaxStop ajaxSend ajaxComplete ajaxError", assert)();
		jQuery(document).ajaxStop(done);
		jQuery("<div/>").load("data/404.html", function () {
			assert.ok(true, "complete");
		});
	});

	// check if load can be called with url and null data
	QUnit.test("jQuery.fn.load( String, null )", 2, function (assert) {
		jQuery.ajaxSetup({
			beforeSend: function () {
				assert.strictEqual(this.type, "GET", "no data means GET request");
			}
		});
		jQuery("#first").load("data/name.html", null, assert.async());
	});

	// check if load can be called with url and undefined data
	QUnit.test("jQuery.fn.load( String, undefined )", 2, function (assert) {
		jQuery.ajaxSetup({
			beforeSend: function () {
				assert.strictEqual(this.type, "GET", "no data means GET request");
			}
		});
		jQuery("#first").load("data/name.html", undefined, assert.async());
	});

	// check if load can be called with only url
	QUnit.asyncTest("jQuery.fn.load( URL_SELECTOR )", 1, function (assert) {
		jQuery("#first").load("data/test3.html div.user", function () {
			assert.strictEqual(jQuery(this).children("div").length, 2, "Verify that specific elements were injected");
			QUnit.start();
		});
	});

	// Selector should be trimmed to avoid leading spaces (#14773)
	QUnit.asyncTest("jQuery.fn.load( URL_SELECTOR with spaces )", 1, function (assert) {
		jQuery("#first").load("data/test3.html   #superuser ", function () {
			assert.strictEqual(jQuery(this).children("div").length, 1, "Verify that specific elements were injected");
			QUnit.start();
		});
	});

	// Selector should be trimmed to avoid leading spaces (#14773)
	// Selector should include any valid non-HTML whitespace (#3003)
	QUnit.test("jQuery.fn.load( URL_SELECTOR with non-HTML whitespace(#3003) )", function (assert) {
		assert.expect(1);
		var done = assert.async();
		jQuery("#first").load("data/test3.html   #whitespace\\\\xA0 ", function () {
			assert.strictEqual(jQuery(this).children("div").length, 1, "Verify that specific elements were injected");
			done();
		});
	});

	QUnit.asyncTest("jQuery.fn.load( String, Function ) - simple: inject text into DOM", 2, function (assert) {
		jQuery("#first").load(url("data/name.html"), function () {
			assert.ok(/^ERROR/.test(jQuery("#first").text()), "Check if content was injected into the DOM");
			QUnit.start();
		});
	});

	QUnit.asyncTest("jQuery.fn.load( String, Function ) - check scripts", 7, function (assert) {
		var verifyEvaluation = function () {
			assert.strictEqual(window["testBar"], "bar", "Check if script src was evaluated after load");
			assert.strictEqual(jQuery("#ap").html(), "bar", "Check if script evaluation has modified DOM");
			QUnit.start();
		};

		Globals.register("testFoo");
		Globals.register("testBar");

		jQuery("#first").load(url("data/test.html"), function () {
			assert.ok(jQuery("#first").html().match(/^html text/), "Check content after loading html");
			assert.strictEqual(jQuery("#foo").html(), "foo", "Check if script evaluation has modified DOM");
			assert.strictEqual(window["testFoo"], "foo", "Check if script was evaluated after load");
			setTimeout(verifyEvaluation, 600);
		});
	});

	QUnit.asyncTest("jQuery.fn.load( String, Function ) - check file with only a script tag", 3, function (assert) {
		Globals.register("testFoo");

		jQuery("#first").load(url("data/test2.html"), function () {
			assert.strictEqual(jQuery("#foo").html(), "foo", "Check if script evaluation has modified DOM");
			assert.strictEqual(window["testFoo"], "foo", "Check if script was evaluated after load");
			QUnit.start();
		});
	});

	QUnit.asyncTest("jQuery.fn.load( String, Function ) - dataFilter in ajaxSettings", 2, function (assert) {
		jQuery.ajaxSetup({
			dataFilter: function () {
				return "Hello World";
			}
		});
		jQuery("<div/>").load(url("data/name.html"), function (responseText) {
			assert.strictEqual(jQuery(this).html(), "Hello World", "Test div was filled with filtered data");
			assert.strictEqual(responseText, "Hello World", "Test callback receives filtered data");
			QUnit.start();
		});
	});




	QUnit.test("#2046 - jQuery.fn.load( String, Function ) with ajaxSetup on dataType json", 1, function (assert) {
		var done = assert.async();

		jQuery.ajaxSetup({
			dataType: "json"
		});
		jQuery(document).ajaxComplete(function (e, xml, s) {
			assert.strictEqual(s.dataType, "html", "Verify the load() dataType was html");
			jQuery(document).off("ajaxComplete");
			done();
		});
		jQuery("#first").load("data/test3.html");
	});




	//----------- jQuery.active

	QUnit.test("jQuery.active", function (assert) {
		assert.expect(1);
		assert.ok(jQuery.active === 0, "ajax active counter should be zero: " + jQuery.active);
	});

})();
